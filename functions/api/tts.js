export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const text = String(body.text || '').trim();
    if (!text || text.length > 1200) return Response.json({error:'听力文本无效'}, {status:400});
    if (!context.env.AI) return Response.json({error:'Workers AI 尚未绑定'}, {status:503});
    const result = await context.env.AI.run('@cf/myshell-ai/melotts', {prompt:text, lang:'en'});
    const encoded = result && typeof result === 'object' ? result.audio : result;
    if (typeof encoded !== 'string') return Response.json({error:'云端返回的音频格式无效'}, {status:502});
    const binary = atob(encoded);
    const audio = new Uint8Array(binary.length);
    for (let i=0;i<binary.length;i++) audio[i]=binary.charCodeAt(i);
    return new Response(audio, {headers:{'Content-Type':'audio/wav','Cache-Control':'public, max-age=86400'}});
  } catch (error) {
    return Response.json({error:error?.message || '听力生成失败'}, {status:500});
  }
}

export function onRequestOptions(){return new Response(null,{status:204})}
