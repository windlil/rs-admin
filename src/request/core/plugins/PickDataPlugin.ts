import { RequestPlugin } from '../types/index';

const PickDataPlugin: RequestPlugin = () => {
  return {
    name: 'pick-data-plugin',
    beforeRequest(config) {
      return config;
    }
  };
};

export default PickDataPlugin;