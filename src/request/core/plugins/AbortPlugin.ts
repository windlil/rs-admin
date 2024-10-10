import { AxiosRequestConfig } from 'axios';
import { RequestPlugin } from '../types/index';

class AbortClass {
  private pendingSet: Map<string, AbortController> = new Map();

  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const uniKey = this.getUniKey(config);
    const abort = new AbortController();
    config.signal = abort.signal;
    if (!this.pendingSet.has(uniKey)) {
      this.pendingSet.set(uniKey, abort);
    }
  }
  removePending(config: AxiosRequestConfig) {
    const uniKey = this.getUniKey(config);
    if (this.pendingSet.has(uniKey)) {
      const abort = this.pendingSet.get(uniKey);
      abort?.abort();
      this.pendingSet.delete(uniKey);
    }
  }
  getUniKey(config: AxiosRequestConfig) {
    return `${config.url}_${config.method}_${config.params}`;
  }
}

const AbortPlugin: RequestPlugin = () => {
  const abort = new AbortClass();

  return {
    name: 'abort-plugin',
    beforeRequest(config) {
      abort.addPending(config);

      return config;
    },
    beforeResponse(response) {
      if (response) {
        abort.removePending(response.config);
      }
      return response;
    },
    responseCatch(err) {
      return err;
    },
  };
};

export default AbortPlugin;
