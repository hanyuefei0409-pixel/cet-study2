const ALLOWED_ORIGINS = new Set([
  "https://cet-study2-mobile.pages.dev",
  "https://hanyuefei0409-pixel.github.io"
]);

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://cet-study2-mobile.pages.dev",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Vary": "Origin"
  };
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request);
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return Response.json({ error: "仅支持学习助手请求" }, { status: 405, headers: cors });
    const origin = request.headers.get("Origin");
    if (origin && !ALLOWED_ORIGINS.has(origin)) return Response.json({ error: "来源未授权" }, { status: 403, headers: cors });
    try {
      const body = await request.json();
      const message = String(body.message || "").trim();
      const level = body.level === "CET-6" ? "六级" : "四级";
      if (!message || message.length > 1800) return Response.json({ error: "问题为空或内容过长" }, { status: 400, headers: cors });
      const result = await env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
        messages: [
          { role: "system", content: `你是大学英语${level}私人学习助手。用简体中文回答，英语例句保留英文。优先讲清词汇、语法、阅读证据、听力方法、翻译和写作修改。回答简洁、分点明确；不确定时明确说明，不编造真题答案。` },
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.35
      });
      const answer = result?.response || result?.result?.response || "暂时没有生成回答";
      return Response.json({ answer }, { headers: { ...cors, "Cache-Control": "no-store" } });
    } catch (error) {
      return Response.json({ error: error?.message || "AI服务暂时不可用" }, { status: 500, headers: cors });
    }
  }
};
