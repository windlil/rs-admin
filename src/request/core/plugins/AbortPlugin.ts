import { RequestPlugin } from '../types/index';

const AbortPlugin: RequestPlugin = () => {
  return {
    name: 'abort-plugin',
    beforeRequest(config) {
      return config;
    }
  };
};

export default AbortPlugin;