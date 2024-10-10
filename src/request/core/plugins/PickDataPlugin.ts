import { RequestPlugin } from '../types/index';

const PickDataPlugin: RequestPlugin = () => {
  return {
    name: 'pick-data-plugin',
    beforeResponse(res) {
      return res?.data ?? res;
    }
  };
};

export default PickDataPlugin;