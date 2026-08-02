(function(){
  const commonWriting4=[
    ['校园旧物共享','Write an essay on why a campus reuse platform is valuable and how students can use it responsibly.','价值—现实问题—两条可执行建议','reuse, responsibility, sustainable consumption'],
    ['合理使用生成式AI','Write an essay on how college students can use generative AI without weakening independent thinking.','承认效率—指出风险—建立使用边界','independent thinking, verify, academic integrity'],
    ['运动与学习效率','Write an essay on the role of regular exercise in effective college study.','现象—身心收益—形成习惯','concentration, relieve stress, routine'],
    ['志愿服务的成长价值','Write an essay on what students can learn from community volunteering.','能力成长—社会理解—行动建议','empathy, cooperation, civic responsibility'],
    ['短视频与时间管理','Write an essay on managing short-video use during exam preparation.','问题—原因—具体管理办法','distraction, screen time, self-discipline'],
    ['宿舍公共生活','Write an essay on how roommates can build a respectful shared living environment.','冲突来源—沟通原则—共同规则','mutual respect, boundaries, compromise'],
    ['数字工具与纸质阅读','Write an essay comparing digital tools and paper reading in college learning.','各自优势—适用场景—平衡使用','accessibility, deep reading, balance'],
    ['面对失败','Write an essay on why learning from setbacks matters to college students.','重新定义失败—反思方法—再次行动','setback, reflection, resilience']
  ];
  const commonWriting6=[
    ['人工智能时代的判断力','Write an essay on why sound judgment becomes more important as AI tools grow more capable.','技术便利—判断风险—培养验证与责任意识','critical judgment, accountability, evidence'],
    ['城市韧性与青年参与','Write an essay on how young people can contribute to resilient cities.','风险背景—青年优势—参与路径','resilience, public participation, local action'],
    ['跨学科学习','Write an essay on the value and difficulty of interdisciplinary learning.','必要性—常见障碍—有效方法','interdisciplinary, perspective, integration'],
    ['信息过载','Write an essay on maintaining attention and judgment in an age of information overload.','信息环境—个人代价—筛选机制','information overload, credibility, attention'],
    ['传统文化的当代表达','Write an essay on presenting traditional culture to contemporary audiences.','传承目标—避免表面化—创新表达','cultural heritage, interpretation, innovation'],
    ['绿色转型的公平性','Write an essay on why fairness should be considered in the green transition.','转型必要—成本分配—政策与个人责任','green transition, equity, long-term benefit'],
    ['大学教育与不确定性','Write an essay on how university education can prepare students for an uncertain future.','不确定性—可迁移能力—终身学习','adaptability, transferable skills, lifelong learning'],
    ['公共讨论中的分歧','Write an essay on how constructive disagreement can improve public discussion.','分歧价值—破坏性表达—建设性规则','constructive disagreement, evidence, common ground']
  ];
  const trans4=[
    ['社区图书馆','近年来，许多社区图书馆不仅提供图书借阅服务，还开设讲座、亲子阅读和数字技能课程。它们为不同年龄的居民创造了学习与交流的公共空间。','In recent years, many community libraries have offered not only book-lending services but also lectures, parent-child reading activities and digital-skills courses. They create public spaces where residents of different ages can learn and communicate.'],
    ['中国高铁','中国高铁连接了越来越多的城市，缩短了人们出行的时间。便捷的交通也促进了旅游和区域间的经济交流。','China’s high-speed railway connects an increasing number of cities and shortens travel time. Convenient transport also promotes tourism and economic exchanges between regions.'],
    ['二十四节气','二十四节气反映了古人对季节变化的观察。今天，人们仍会根据节气安排农事活动，并通过各种习俗感受传统文化。','The twenty-four solar terms reflect ancient Chinese people’s observation of seasonal changes. Today, people still arrange farming activities according to them and experience traditional culture through various customs.'],
    ['移动支付','移动支付给日常生活带来了便利。为了让老年人也能享受数字服务，一些公共场所同时保留现金支付并提供操作帮助。','Mobile payment has brought convenience to daily life. To help older people enjoy digital services, some public places still accept cash and provide assistance with digital operations.'],
    ['城市公园','城市公园为居民提供运动和休息的空间，也有助于改善生态环境。越来越多的城市正在建设步行可达的小型公园。','Urban parks provide residents with space for exercise and rest and help improve the ecological environment. More cities are building small parks within walking distance.'],
    ['乡村电商','电子商务帮助一些乡村把特色农产品销售到更远的地方。年轻人返乡创业，也为当地带来了新的技能和就业机会。','E-commerce helps some villages sell distinctive agricultural products to distant markets. Young people returning home to start businesses also bring new skills and job opportunities.']
  ];
  const trans6=[
    ['大运河保护','大运河不仅是古代交通工程，也是连接沿线城市历史与文化的重要纽带。如今，保护工作更重视水生态修复、文化遗产展示以及社区参与。','The Grand Canal is not only an ancient transport project but also an important link connecting the history and culture of cities along it. Today, conservation places greater emphasis on restoring aquatic ecosystems, presenting cultural heritage and involving local communities.'],
    ['数字乡村','数字基础设施正在改变乡村的生产和公共服务方式。远程医疗、在线教育和智慧农业带来机会，但人才培养和数据安全同样值得重视。','Digital infrastructure is changing rural production and public services. Telemedicine, online education and smart agriculture create opportunities, while talent development and data security deserve equal attention.'],
    ['博物馆创新','许多博物馆利用数字展览和互动技术讲述文物背后的故事。这些方式扩大了文化传播的范围，但高质量内容仍然是吸引观众的核心。','Many museums use digital exhibitions and interactive technology to tell the stories behind cultural relics. These approaches broaden cultural communication, but high-quality content remains central to engaging audiences.'],
    ['绿色建筑','绿色建筑关注的不只是节能材料，还包括建筑在整个使用周期中的资源消耗。合理设计可以提高舒适度，并降低长期运行成本。','Green buildings concern not only energy-saving materials but also resource consumption throughout a building’s life cycle. Sound design can improve comfort and reduce long-term operating costs.'],
    ['老龄化社会','面对人口老龄化，社会需要完善医疗和养老服务，也应创造条件让老年人继续参与社区生活。科技可以提供帮助，但不能替代人与人的关怀。','In response to population ageing, society needs to improve health and elderly-care services and enable older people to remain involved in community life. Technology can help, but it cannot replace human care.'],
    ['中国航天','中国航天事业的发展离不开长期投入和多学科合作。航天探索不仅推动科技进步，也激励年轻人保持好奇心并勇于面对未知。','The development of China’s space programme relies on long-term investment and multidisciplinary cooperation. Space exploration not only advances science and technology but also inspires young people to stay curious and face the unknown with courage.']
  ];
  function writing(list,level){return list.map((x,i)=>({id:`${level}w${i+1}`,title:x[0],prompt:x[1],outline:x[2],keywords:x[3],minutes:30,type:'writing'}));}
  function translation(list,level){return list.map((x,i)=>({id:`${level}t${i+1}`,title:x[0],prompt:x[1],reference:x[2],minutes:30,type:'translation'}));}
  window.CET_PRACTICE={
    cet4:{writing:writing(commonWriting4,'4'),translation:translation(trans4,'4')},
    cet6:{writing:writing(commonWriting6,'6'),translation:translation(trans6,'6')},
    mock:{
      cet4:[{id:'4m1',title:'校园与成长综合模考',theme:'校园生活·数字素养·可持续发展'},{id:'4m2',title:'社会生活综合模考',theme:'公共服务·健康·志愿行动'},{id:'4m3',title:'科技与文化综合模考',theme:'人工智能·传统文化·绿色城市'}],
      cet6:[{id:'6m1',title:'科技与责任综合模考',theme:'人工智能·学术判断·信息社会'},{id:'6m2',title:'发展与公平综合模考',theme:'绿色转型·城市韧性·公共服务'},{id:'6m3',title:'文化与未来综合模考',theme:'文化传播·跨学科·终身学习'}]
    },
    note:'全部专项题为依据公开考试结构原创编写；高频主题预测不代表官方命题。'
  };
})();
