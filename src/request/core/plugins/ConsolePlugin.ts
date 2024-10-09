import { RequestPlugin } from '../types/index';

const ConsolePlugin: RequestPlugin = () => {
  return {
    name: 'console-plugin',
    beforeRequest(config) {
      return config;
    }
  };
};

export default ConsolePlugin;