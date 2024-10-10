import { RequestPlugin } from '../types/index';

const ConsolePlugin: RequestPlugin = () => {
  return {
    name: 'console-plugin',
    beforeRequest(config) {
      console.log(`[ConsolePlugin] url: ${config.url}; method: ${config.method};`);
      return config;
    }
  };
};

export default ConsolePlugin;