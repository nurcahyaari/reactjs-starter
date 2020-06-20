/* eslint-disable no-unused-vars */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-cycle
import { InterceptorDTO } from './interceptor';

export default class Api {
    private api: AxiosInstance;

    public constructor(config: AxiosRequestConfig) {
        this.api = axios.create(config);
        this.SetInterceptorRequest = this.SetInterceptorRequest.bind(this);
        this.SetInterceptorResponse = this.SetInterceptorResponse.bind(this);
    }

    public SetInterceptorRequest(AxiosRequestInterceptor:InterceptorDTO) {
        // this middleware is been called right before the http request is made.
        this.api.interceptors.request.use(
            AxiosRequestInterceptor.Handler,
            AxiosRequestInterceptor.ErrorHandler,
        );
    }

    public SetInterceptorResponse(AxiosResponseInterceptor:InterceptorDTO) {
        // this middleware is been called right
        // before the response is get it by the method that triggers the request
        this.api.interceptors.response.use(
           AxiosResponseInterceptor.Handler,
           AxiosResponseInterceptor.ErrorHandler,
        );
    }

    public GetInstance() {
        return this.api;
    }

    public GetUri(config?: AxiosRequestConfig): string {
        return this.api.getUri(config);
    }

    public Request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.api.request(config);
    }

    public Get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.get(url, config);
    }

    public Delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.delete(url, config);
    }

    public Head<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.head(url, config);
    }

    public Post<T, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.api.post(url, data, config);
    }

    public Put<T, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.api.put(url, data, config);
    }

    public Patch<T, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.api.patch(url, data, config);
    }
}
