export default {
  async fetch(request,env){
    const cors={"Access-Control-Allow-Origin":env.APP_ORIGIN||"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"POST,OPTIONS"};
    if(request.method==="OPTIONS")return new Response(null,{headers:cors});
    if(request.method!=="POST")return Response.json({error:"Method not allowed"},{status:405,headers:cors});
    try{
      const {message,level}=await request.json();
      if(!message||String(message).length>3000)return Response.json({error:"问题为空或过长"},{status:400,headers:cors});
      const base=(env.API_BASE||"https://api.openai.com/v1").replace(/\/$/,"");
      const upstream=await fetch(`${base}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${env.API_KEY}`},body:JSON.stringify({model:env.MODEL||"gpt-5.4-mini",messages:[{role:"system",content:`你是大学英语${level==="CET-6"?"六级":"四级"}学习助手。用中文简洁讲解，引用原文证据，不编造答案。`},{role:"user",content:String(message)}]})});
      const data=await upstream.json(); if(!upstream.ok)throw new Error(data?.error?.message||`上游错误 ${upstream.status}`);
      return Response.json({answer:data.choices?.[0]?.message?.content||"暂时没有生成回答"},{headers:cors});
    }catch(error){return Response.json({error:error.message||"服务异常"},{status:500,headers:cors})}
  }
};
