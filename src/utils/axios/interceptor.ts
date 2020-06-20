/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import Axios, { AxiosRequestConfig } from 'axios';
// eslint-disable-next-line import/no-cycle
import Api from './index';
import { APIConfig } from '../../config/api/index';
// import { KEY_PREFIX } from 'redux-persist';
// import Storage from '../storage/index';

export interface InterceptorDTO {
    Handler:any;
    ErrorHandler:any;
}

async function GenerateRefreshToken(refreshToken:string):Promise<any> {
	const api = new Api(APIConfig);
	return api.Post('auth/refresh', {
		refreshToken,
	});
}

export const RequestInterceptor:InterceptorDTO = {
	Handler: async (config:AxiosRequestConfig) => {
		const state = JSON.parse(await Storage.GetItems(`${KEY_PREFIX}root`));
		const { auth } = JSON.parse(state).auth;
		const { token } = auth.key;
		const newConfig = {
			...config,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		return newConfig;
	},
	ErrorHandler: (error:any) => Promise.reject(error),
};

let isRefreshing = false;

let subscribers:any[] = [];

export const ResponseInterceptor:InterceptorDTO = {
	Handler: (response:any) => response,
	ErrorHandler: async (error:any):Promise<any> => {
		const { config, response: { status } } = error;
		const originalRequest = config;

		const globState = JSON.parse(await Storage.GetItems(`${KEY_PREFIX}root`));
		const { auth } = JSON.parse(globState).auth;
		const { refreshToken } = auth.key;

		// check if error response code is 401 <Unautorization> it will refreshing the token
		if (status === 401) {
			if (refreshToken !== null) {
				if (!isRefreshing) {
					isRefreshing = true;
					GenerateRefreshToken(refreshToken)
						.then(async (res:any) => {
							isRefreshing = false;
							auth.key.token = res.data.token;
							auth.key.refreshToken = res.data.refresh_token;

							await Storage.SetItems(`${KEY_PREFIX}root`, JSON.stringify({
								...globState,
								auth: JSON.stringify(auth),
							}));
							onRrefreshed(res.data.token);
							subscribers = [];
						});
				}
				return new Promise((resolve) => {
					subscribeTokenRefresh((token:any) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						resolve(Axios(originalRequest));
					});
				});
			}
		}
		return Promise.reject(error);
	},
};

function subscribeTokenRefresh(cb:any) {
	subscribers.push(cb);
}

function onRrefreshed(token:any) {
	subscribers.map((cb) => cb(token));
}
