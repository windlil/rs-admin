import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { GlobalConfig } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getModule = async () => {
  const defaultExport = (await import(path.join(__dirname, '../config.js')))?.default as GlobalConfig;
  return defaultExport;
};

const run = async () => {
  const globalConfig = await getModule();
  // 定义要运行的命令
  const devCommand = `cross-env NODE_ENV=${globalConfig.mode} rspack serve`;
  const mockCommand = 'esno ./scripts/server/index.mjs';
  // 启动 dev 命令
  const devProcess = spawn('sh', ['-c', devCommand], {
    stdio: 'inherit', // 将子进程的输出继承到主进程
  });

  // 启动 mock 命令
  const mockProcess = globalConfig?.mock ? spawn('sh', ['-c', mockCommand], {
    stdio: 'inherit', // 将子进程的输出继承到主进程
  }) : null;

  if (mockProcess) {
    mockProcess.on('exit', (code) => {
      console.log(`start:mock 进程退出，退出码: ${code}`);
      // 如果 mock 进程退出，终止 dev 进程
      devProcess.kill();
    });
  }

  // 监听子进程的退出事件
  devProcess.on('exit', (code) => {
    console.log(`start:dev 进程退出，退出码: ${code}`);
    // 如果 dev 进程退出，终止 mock 进程
    if (mockProcess) {
      mockProcess.kill();
    }
  });
};

run();