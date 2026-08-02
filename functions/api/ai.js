export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const message = String(body.message || "").trim();
    const level = body.level === "CET-6" ? "六级" : "四级";
    if (!message || message.length > 1800) {
      return Response.json({ error: "问题为空或内容过长" }, { status: 400 });
    }
    const result = await context.env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
      messages: [
        { role: "system", content: `你是大学英语${level}私人学习助手。用简体中文回答，英语例句保留英文。优先讲清词汇、语法、阅读证据、听力方法、翻译和写作修改。回答简洁、分点明确；不确定时明确说明，不编造真题答案。` },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.35
    });
    return Response.json({ answer: result?.response || result?.result?.response || "暂时没有生成回答" }, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    return Response.json({ error: error?.message || "AI服务暂时不可用" }, { status: 500 });
  }
}

export function onRequestOptions() {
  return new Response(null, { status: 204 });
}
