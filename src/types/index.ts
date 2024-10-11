export interface GlobalConfig {
  mode: 'dev' | 'prod'
  mock: boolean,
  mockPort: number,
  commitlint: boolean,
  stylelint: boolean,
}