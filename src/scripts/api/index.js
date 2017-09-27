// @flow
import { post } from '../lib/http';
import { API_BASE_URL } from '../settings';
import { RESTfulAPI, Resource } from '../lib/http';

const api = new RESTfulAPI(API_BASE_URL, 'api/v1');

export const login = (username: string, password: string) =>
  post(
    api.getURL('token-auth'),
    { username, password }
  ).then(({ token }) => token);

export const User = new Resource({
  name: 'users',
  api,
  customization: {
    groups: {
      method: 'GET',
      urlPart: 'groups',
      isDetail: true
    }
  }
});

export const Configurations = new Resource({
  name: 'configurations',
  api
});
