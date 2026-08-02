export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const text = String(body.text || '').trim();
    if (!text || text.length > 1200) return Response.json({error:'听力文本无效'}, {status:400});
    const audio = await context.env.AI.run('@cf/myshell-ai/melotts', {prompt:text, lang:'en'});
    return new Response(audio, {headers:{'Content-Type':'audio/mpeg','Cache-Control':'public, max-age=86400'}});
  } catch (error) {
    return Response.json({error:error?.message || '听力生成失败'}, {status:500});
  }
}

export function onRequestOptions(){return new Response(null,{status:204})}
