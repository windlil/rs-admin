import RsRequest from './core/RequestClass';
import AbortPlugin from './core/plugins/AbortPlugin';
import PickDataPlugin from './core/plugins/PickDataPlugin';

const request = new RsRequest({
  baseURL: 'http://localhost:8001',
  plugins: [AbortPlugin(), PickDataPlugin()]
});

export default request;
