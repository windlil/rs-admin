import { GlobalConfig } from './src/types/index';
// rs-admin 全局配置
const config: GlobalConfig =  {
  // 开发环境 prod ｜ dev
  mode: 'dev',
  // 是否开启mock服务
  mock: true,
  // mock 服务端口号
  mockPort: 8001,
  // 是否启用 commitlint
  commitlint: true,
  // 是否启用 stylelint
  stylelint: true,
};

export default config;