(function(){
const prompts=[
['简历建议书信','Write a letter to offer suggestions to your cousin on how to make his resume distinctive. Write 120-180 words.'],
['改变的重要性','Write an essay entitled “The Importance of Change”, commenting on the saying “If you are prepared to adapt and learn, you can transform.” Write 120-180 words.'],
['跟团游还是自助游','Choose between a package tour and a self-guided tour and explain the reasons for your choice. Write 120-180 words.'],
['如何了解其他国家','Choose between travelling abroad and obtaining information online as a way to learn about other countries. Explain your choice in 120-180 words.'],
['医疗是否应该免费','Give your opinion on whether health care should be free for everyone or people should pay their own medical costs. Write 120-180 words.'],
['网络团购现象','Write a short essay expressing your views on the phenomenon of group purchasing. Write 120-180 words.'],
['整容现象','Write a short essay expressing your views on the phenomenon of cosmetic surgery. Write 120-180 words.'],
['独立思考','Comment on the saying “Create your own life” and illustrate the importance of independence of mind. Write 120-180 words.'],
['年轻人的独立性','Describe the supplied picture and express your views on the independence of young people in modern society. Write 120-180 words.'],
['儿童面对的负担','Describe the supplied picture and express your views on the burden children are facing. Write 120-180 words.']
];
window.CET_LICENSED_MOCKS=prompts.map((x,i)=>({id:`licensed-cet4-${i+1}`,title:`授权模拟第${i+1}套`,writingTitle:x[0],writingPrompt:x[1],paper:`resources/cet4-licensed-mocks/mock-${i+1}-paper.pdf`,answer:`resources/cet4-licensed-mocks/mock-${i+1}-answer.pdf`}));
const target=window.CET_PRACTICE?.cet4?.writing;
if(target)prompts.forEach((x,i)=>target.push({id:`licensed-writing-${i+1}`,type:'writing',title:`授权真题风格写作 ${i+1} · ${x[0]}`,prompt:x[1],minutes:30,outline:'按题目要求完成引入、主体论证和结论；完成后可查看对应整套解析 PDF。',keywords:'观点明确 · 结构完整 · 120-180词'}));
})();
