// @flow
import isEmptyObject from 'is-empty-object';
import 'whatwg-fetch';

type URLParamsType = {[string]: string};
type ResponseType = {
  status: number,
  +json: () => Promise<*>,
  statusText: string
};
type FetchPromiseResponseType = Promise<Object>;
type ResourceConstructorType = {
  name: string,
  api: RESTfulAPI,
  headerKey?: string,
  headerPrefix?: string,
  customization?: {[string]: {
    method: string,
    urlPart: string,
    isDetail: boolean
  }}
};
type RequestHeadersType = {
  headers: URLParamsType
}
type RequestTokenType = {
  token?: string
};
type RequestCommonType = RequestTokenType & RequestHeadersType;
type FileRequestCommonType = {
  files: Object
} & RequestCommonType;
type ResourceListType = {
  filters: URLParamsType,
  headers: URLParamsType,
  token?: string
};
type DetailResourceType = {
  id: number
} & RequestCommonType;
type UpdateResourceType = {
  id: number,
  data: URLParamsType,
} & FileRequestCommonType;
type CreateResourceType = {
  data: URLParamsType
} & FileRequestCommonType;
type CustomMethodType = {
  params: URLParamsType
} & FileRequestCommonType;
type CustomDetailMethodType = {
  id: number,
  params: URLParamsType
} & FileRequestCommonType;

const toQuery = (params: URLParamsType): string => Object.keys(
  params).filter(key => typeof params[key] !== 'undefined').map(
    value => `${value}=${params[value]}`)
  .join("&");

const primaryResponseHandler = (response: ResponseType): Promise<*> => {
  if (response.status >= 200 && response.status < 300) {

    // No body
    if (response.status === 204) {
      return Promise.resolve({});
    }

    return response.json();
  }

  let error = new Error(response.statusText);

  throw {
    error,
    status: response.status,
    promise: response.json()
  };
}

const call = (
  url: string,
  method: string,
  data?: URLParamsType,
  headers?: URLParamsType,
  files?: Object = {}): Promise<*> => {
  let request = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    body: undefined
  };

  if(['POST', 'PUT', 'PATCH'].includes(method)) {
    if(typeof data !== 'undefined') {
      request.body = JSON.stringify(data);
    }

    // TODO: allow multiple files per file key
    const fData = new FormData();
    Object.keys(files).forEach(key => fData.append(key, files[key]));
    request.body = fData;
    delete request.headers['Content-Type'];
  }

  return fetch(url, request).then(primaryResponseHandler);
}

export const post = (
  url: string,
  data: URLParamsType,
  headers?: URLParamsType,
  files?: Object): FetchPromiseResponseType =>
  call(url, 'POST', data, headers, files);

export const put = (
  url: string,
  data: URLParamsType,
  headers?: URLParamsType,
  files?: Object): FetchPromiseResponseType =>
  call(url, 'PUT', data, headers, files);

export const patch = (
  url: string,
  data: URLParamsType,
  headers?: URLParamsType,
  files?: Object): FetchPromiseResponseType =>
  call(url, 'PATCH', data, headers, files);

export const get = (
  url: string,
  headers?: URLParamsType): FetchPromiseResponseType =>
  call(url, 'GET', undefined, headers);

export const del = (
  url: string,
  headers?: URLParamsType): FetchPromiseResponseType =>
  call(url, 'DELETE', undefined, headers);

export class RESTfulAPI {
  url: string;
  prefix: string;

  constructor(url: string, prefix: string) {
    this.url = url;
    this.prefix = prefix;
  }

  getURL(route: string, params: URLParamsType = {}) {
    if(!isEmptyObject(params)){
      const query = toQuery(params);
      return `${this.url}/${this.prefix}/${route}/?${query}`;
    }

    return `${this.url}/${this.prefix}/${route}/`;
  }
}

export class Resource {
  api: RESTfulAPI;
  name: string;
  custom: {[string]: any => Promise<*>};
  getAuthHeaders: (URLParamsType, ?string) => URLParamsType;

  handleRequest(
    url: string,
    pUrl: string,
    method: string,
    params: URLParamsType,
    headers: URLParamsType,
    files: Object) {
    switch(method) {
      case 'POST':
        return post(url, params, headers, files);
      case 'DELETE':
        return del(pUrl, headers);
      case 'PUT':
        return put(url, params, headers, files);
      case 'PATCH':
        return patch(url, params, headers, files);
      default:
        return get(pUrl, headers);
    }
  }

  constructor({
    name,
    api,
    headerKey = 'Authorization',
    headerPrefix = 'JWT',
    customization = {}}: ResourceConstructorType) {
    this.api = api;
    this.name = name;
    this.custom = {};

    this.getAuthHeaders = (headers, token) => token !== null && typeof token !== 'undefined' ? ({
      ...headers,
      [headerKey]: `${headerPrefix} ${token}`
    }) : headers;

    Object.keys(customization).forEach(key => {
      const { method, urlPart, isDetail } = customization[key];

      if(isDetail) {
        this.custom[key] = ({ id, params = {}, headers = {}, token, files = {} }: CustomDetailMethodType) => {
          const url = this.api.getURL(`${this.name}/${id}/${urlPart}`);
          const pUrl = this.api.getURL(`${this.name}/${id}/${urlPart}`, params);
          return this.handleRequest(
            url,
            pUrl,
            method,
            params,
            this.getAuthHeaders(headers, token),
            files
          );
        }
      } else {
        this.custom[key] = ({ params = {}, headers = {}, token, files = {} }: CustomMethodType) => {
          const url = this.api.getURL(`${this.name}/${urlPart}`);
          const pUrl = this.api.getURL(`${this.name}/${urlPart}`, params);
          return this.handleRequest(
            url,
            pUrl,
            method,
            params,
            this.getAuthHeaders(headers, token),
            files
          );
        }
      }
    });
  }

  list({ filters, headers = {}, token }: ResourceListType) {
    return get(this.api.getURL(this.name, filters), this.getAuthHeaders(headers, token));
  }

  create({ data, headers = {}, files = {}, token }: CreateResourceType) {
    return post(this.api.getURL(this.name), data, this.getAuthHeaders(headers, token), files);
  }

  detail({ id, headers = {}, token }: DetailResourceType) {
    return get(this.api.getURL(`${this.name}/${id}`), this.getAuthHeaders(headers, token));
  }

  update({ id, data = {}, headers = {}, files = {}, token }: UpdateResourceType) {
    return patch(this.api.getURL(`${this.name}/${id}`), data, this.getAuthHeaders(headers, token), files);
  }

  remove({ id, headers = {}, token }: DetailResourceType) {
    return del(this.api.getURL(`${this.name}/${id}`), this.getAuthHeaders(headers, token));
  }
}
