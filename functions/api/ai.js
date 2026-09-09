const PRIMARY_MODEL = "@cf/openai/gpt-oss-120b";
const FALLBACK_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const SYSTEM_PROMPT = `你是一名严谨、耐心、善于推理的通用 AI 助手。你擅长大学英语四六级，也可以回答日常知识、科技、历史、生活、写作、翻译、计算和其他常见问题。先判断用户真正想解决的任务，再用最直接的方式回答。你的首要任务是准确回答当前问题，并结合对话上下文理解“刚才”“这个词”“这句话”等指代。问题与英语学习无关时，按通用助手方式直接回答，不要强行联系四六级。

回答要求：
1. 使用简体中文，英文原句和例句保留英文，并给出完整、自然的中文翻译。
2. 直接回答问题，不要把所有回答机械地拆成“词汇、语法、阅读、听力、翻译、写作”等无关栏目。
3. 词汇辨析要说明最常见词性、核心含义、常见搭配、区别和例句；不要遗漏例句中的词。
4. 长难句要标出主干、各从句的边界、类型和句中作用，再给出完整翻译。并列结构不是从句，不要编造语法名称。
5. 写作修改要指出具体错误及原因，并给出修改后的完整版本。
6. 学习规划只使用提供的学习数据；没有数据时先说明，不要假装知道学生的真实情况。
7. 如果学生指出上一条回答有错，先核对并明确纠正。不能确定时坦率说明，不编造真题答案。
8. 回答常识、科学和历史问题时，先核对关键事实与因果关系；明确区分主要原因、次要影响和常见误解，不为凑字数补充未经核对的说法。
9. 需要计算、比较或推理时，展示关键步骤并检查结果；用户的问题有歧义时，先指出你的理解或给出最合理的两种解释。
10. 对新闻、价格、政策、天气等需要实时信息的问题，不要假装已经联网核实；明确说明信息时效限制，并告诉用户需要补充什么信息。
11. 使用短标题、编号和换行组织答案，不要输出 Markdown 星号或井号。一般控制在 600 字以内，复杂题可以适当展开。`;

function cleanHistory(value) {
  if (!Array.isArray(value)) return [];
  let total = 0;
  return value.slice(-10).map(item => ({
    role: item?.role === "assistant" ? "assistant" : "user",
    content: String(item?.content || "").trim().slice(0, 1200)
  })).filter(item => {
    if (!item.content || total + item.content.length > 6000) return false;
    total += item.content.length;
    return true;
  });
}

function cleanLearningContext(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "暂无可用学习数据";
  const number = key => Number.isFinite(Number(value[key])) ? Number(value[key]) : 0;
  const weakPoints = Array.isArray(value.knownWeakPoints) ? value.knownWeakPoints.slice(0, 5).map(String) : [];
  return JSON.stringify({
    predictedScore: number("predictedScore"), targetScore: number("targetScore"), daysUntilExam: number("daysUntilExam"),
    dailyMinutes: number("dailyMinutes"), completedTasks: number("completedTasks"), totalTasks: number("totalTasks"),
    streakDays: number("streakDays"), weekMinutes: number("weekMinutes"), savedMistakes: number("savedMistakes"),
    learningWords: number("learningWords"), favoriteWords: number("favoriteWords"), knownWeakPoints: weakPoints
  });
}

function answerFrom(result) {
  return String(result?.response || result?.result?.response || "").trim();
}

async function runWithFallback(ai, input) {
  try {
    const result = await ai.run(PRIMARY_MODEL, input);
    const answer = answerFrom(result);
    if (answer) return { answer, model: PRIMARY_MODEL };
    throw new Error("主模型未生成内容");
  } catch (primaryError) {
    console.warn(JSON.stringify({
      message: "Primary AI model failed; using fallback",
      model: PRIMARY_MODEL,
      error: primaryError instanceof Error ? primaryError.message : String(primaryError)
    }));
    const result = await ai.run(FALLBACK_MODEL, input);
    return { answer: answerFrom(result) || "暂时没有生成回答", model: FALLBACK_MODEL };
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const message = String(body.message || "").trim();
    const level = body.level === "CET-6" ? "六级" : "四级";
    if (!message || message.length > 2400) {
      return Response.json({ error: "问题为空或内容过长" }, { status: 400 });
    }
    const history = cleanHistory(body.history);
    const learningContext = cleanLearningContext(body.context);
    const modelResult = await runWithFallback(context.env.AI, {
      messages: [
        { role: "system", content: `${SYSTEM_PROMPT}\n\n当前考试级别：${level}\n可用学习数据：${learningContext}` },
        ...history,
        { role: "user", content: message }
      ],
      max_tokens: 1100,
      temperature: 0.2,
      top_p: 0.9
    });
    return Response.json({ answer: modelResult.answer }, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error(JSON.stringify({ message: "AI assistant request failed", error: error instanceof Error ? error.message : String(error) }));
    return Response.json({ error: error?.message || "AI服务暂时不可用" }, { status: 500 });
  }
}

export function onRequestOptions() {
  return new Response(null, { status: 204 });
}
