import { RequestPlugin } from '../types/index';

const PickDataPlugin: RequestPlugin = () => {
  return {
    name: 'pick-data-plugin',
    beforeResponse(res) {
      if (res.status === 200) {
        return res?.data ?? res;
      }
      return res;
    }
  };
};

export default PickDataPlugin;