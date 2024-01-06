import { VercelRequest, VercelResponse } from '@vercel/node';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default (req: VercelRequest, res: VercelResponse) => {
  const target = determineTarget(req);
  
  // 定义代理配置
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^/${req.headers.host}`]: '' },
  });

  // 使用代理中间件
  proxy(req, res);
};

function determineTarget(req: VercelRequest): string {
  // 在这里，你可以根据 req.headers.host 或者其他信息来动态地确定目标地址
  // 以下是一个简单的例子，假设域名后面的部分为目标地址的一部分
  const parts = req.headers.host?.split('.');
  if (parts && parts.length > 1) {
    return `https://${parts[1]}.${parts[0]}`;
  }

  // 如果无法确定目标地址，可以返回一个默认值
  return 'https://default-target.com';
}

