import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
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

    this.instance.interceptors.request.use(
      (config) => {
        this.plugins.forEach((plugin) => {
          if (plugin?.beforeRequest) {
            config = plugin.beforeRequest(config) ?? config;
          }
        });
        return config;
      },
      (err) => {
        console.log(err);
        this.plugins.forEach((plugin) => {
          if (plugin?.requestCatch) {
            err = plugin.requestCatch(err);
          }
        });
        return Promise.reject(err);
      },
    );

    this.instance.interceptors.response.use(
      (config) => {
        this.plugins.forEach((plugin) => {
          if (plugin?.beforeResponse) {
            config = plugin.beforeResponse(config) ?? config;
          }
        });
        return config;
      },
      (err) => {
        this.plugins.forEach((plugin) => {
          if (plugin?.responseCatch) {
            err = plugin.responseCatch(err);
          }
        });
        return err;
      },
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance.request<any, AxiosResponse<Response>>(config).then((res) => {
        return resolve(res as unknown as Promise<T>);
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  getPluginList() {
    return this.plugins;
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({
      method: 'GET',
      ...config,
    });
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({
      method: 'POST',
      ...config,
    });
  }

  put<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({
      method: 'PUT',
      ...config,
    });
  }

  delete<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({
      method: 'DELETE',
      ...config,
    });
  }

  uploadPlugin(name: string) {
    const index = this.plugins.findIndex((plugin) => plugin.name === name);
    if (index !== -1) {
      this.plugins.splice(index, 1);
    }
  }

  clearPlugins() {
    this.plugins.length = 0;
  }
}

export default RsRequest;
