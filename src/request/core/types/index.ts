import { CreateAxiosDefaults, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestInterceptors = (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any>
export type RequestInterceptorsRejected = ((error: any) => any) | null
export type ResponseInterceptors = (value: AxiosResponse<any, any>) => AxiosResponse<any, any>
export type ResponseInterceptorsRejected = ((error: any) => any) | null;

export type AxiosConfig = {
  abort?: boolean
  plugins?: any[]
} & CreateAxiosDefaults

export type RequestPlugin = () => RequestPluginReturn

export type RequestPluginReturn = {
  name: string
  beforeRequest?: RequestInterceptors
  beforeResponse?: ResponseInterceptors
  requestCatch?: RequestInterceptorsRejected
  responseCatch?: ResponseInterceptorsRejected
}