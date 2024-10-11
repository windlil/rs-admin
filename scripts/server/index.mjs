import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mockPath = join(__dirname, '../../src/mock');

const files = fs.readdirSync(mockPath);

// 加载所有 JavaScript 文件的导出模块
const modules = files.map(async file => {
  const filePath = join(mockPath, file);
  const modules = await import(filePath);
  return {
    file,
    modules,
  };
});

// 等待所有模块加载完成
Promise.all(modules)
.then(importedModules => {
  // 打印所有模块
  importedModules.forEach(({ file, modules }) => {
    for (const method in modules) {
      const m = method.toLowerCase();
      const route = `/api/${file.replace('.ts','')}`;
      app[m](route, async(req, res) => {
        const response = await modules[method](req);
        return res.json(response);
      });
      console.log(`挂载路由: ${m} ${route}`);
    }
  });
})
.catch(err => {
  console.error('加载模块时出错:', err);
});

  app.use(express.json());


const run = async () => {
  const defaultExport = (await import(join(__dirname, '../../config.js')))?.default;

  const port = defaultExport?.mockPort ?? 8001;

  // 启动服务器
  app.listen(port, () => {
    console.log(`Mock server is running on http://localhost:${port}`);
  });
};

run();
