# AI 后台配置

1. 在 Cloudflare Workers 新建 Worker，把 `worker/worker.js` 粘贴并部署。
2. 在 Worker 的 Variables and Secrets 中添加加密变量 `API_KEY`。
3. 添加普通变量：`MODEL` 为模型名，`API_BASE` 默认为 `https://api.openai.com/v1`，`APP_ORIGIN` 填 `https://hanyuefei0409-pixel.github.io`。
4. 修改网站根目录 `config.js`：

```js
window.CET_CONFIG={
  aiEnabled:true,
  aiEndpoint:"https://你的Worker地址"
};
```

不要把 API Key 写入 `config.js` 或公开 GitHub 仓库。这样由你维护后台，使用者手机上不需要配置密钥。
