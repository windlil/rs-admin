import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AxiosConfig, RequestPluginReturn } from './types';

class RsRequest {
  // axios实例
  private instance: AxiosInstance;
  // 用户配置
  private config: AxiosConfig;
  // 自定义插件
  private plugins: RequestPluginReturn[];

  constructor(config: AxiosConfig) {
    this.instance = axios.create(config);
    this.config = config;
    this.plugins = config?.plugins ?? [];
    this.setupPlugins();
  }

  setupPlugins() {
    if (!this.plugins.length) return;
    
    this.instance.interceptors.request.use((config) => {
      this.plugins.forEach((plugin) => {
        if (plugin?.beforeRequest) {
          config = plugin.beforeRequest(config) ?? config;
        } 
      });
      return config;
    }, (err) => {
      this.plugins.forEach(plugin => {
        if (plugin?.requestCatch) {
          err = plugin.requestCatch(err);
        }
      });
      return Promise.reject(err);
    });

    this.instance.interceptors.response.use((config) => {
      this.plugins.forEach((plugin) => {
        if (plugin?.beforeResponse) {
          config = plugin.beforeResponse(config) ?? config;
        } 
      });
      return config;
    }, (err) => {
      this.plugins.forEach(plugin => {
        if (plugin?.responseCatch) {
          err = plugin.responseCatch(err);
        }
      });
      return Promise.reject(err);
    });
  }

  get(config: AxiosRequestConfig) {
    return this.instance.request({
      method: 'GET',
      ...config
    });
  }

  post(config: AxiosRequestConfig) {
    return this.instance.request({
      method: 'POST',
      ...config
    });
  }

  put(config: AxiosRequestConfig) {
    return this.instance.request({
      method: 'PUT',
      ...config
    });
  }

  delete(config: AxiosRequestConfig) {
    return this.instance.request({
      method: 'DELETE',
      ...config
    });
  }

  uploadPlugin(name: string) {
    const index = this.plugins.findIndex(plugin => plugin.name === name);
    if (index !== -1) {
      this.plugins.splice(index, 1);
    }
  }

  clearPlugins() {
    this.plugins.length = 0;
  }
}

export default RsRequest;
