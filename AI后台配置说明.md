# AI 后台配置

当前网站使用 Cloudflare Workers AI Binding，前端不会保存 API Key。

## Cloudflare Pages（当前网站使用）

1. 在 Pages 项目的 Settings → Bindings 中添加 Workers AI binding，变量名填写 `AI`。
2. 部署仓库。`functions/api/ai.js` 会自动提供 `/api/ai` 接口。
3. 保持网站根目录 `config.js` 为：

```js
window.CET_CONFIG={
  aiEnabled:true,
  aiEndpoint:"./api/ai"
};
```

## 独立 Worker（备用部署方式）

`worker/worker.js` 和 `worker/wrangler.jsonc` 提供相同的 AI 能力。部署前确认 Wrangler 配置中的 AI binding 名称是 `AI`，然后把 `config.js` 的 `aiEndpoint` 改成独立 Worker 地址。

助手会接收最近 10 条对话以及分数、目标分、任务进度、错题数等学习数据。后端会限制历史记录和单条问题长度，避免请求无限增大。

当前模型是 `@cf/meta/llama-3.3-70b-instruct-fp8-fast`。如需更换模型，同时修改 `functions/api/ai.js` 和 `worker/worker.js` 中的 `MODEL` 常量。
