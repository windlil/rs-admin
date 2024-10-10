import RsRequest from './core/RequestClass';
import AbortPlugin from './core/plugins/AbortPlugin';
import PickDataPlugin from './core/plugins/PickDataPlugin';

const request = new RsRequest({
  baseURL: 'https://jsonplaceholder.typicode.com',
  plugins: [AbortPlugin(), PickDataPlugin()]
});

export default request;
