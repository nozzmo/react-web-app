// @flow
let api = 'http://localhost:8000';
let media = 'http://localhost:8000';

if(process.env.NODE_ENV === 'production') {
  api = 'http://production.com';
  media = 'http://production.com';
}

export const API_BASE_URL = api;
export const MEDIA_BASE_URL = media;
export const PAGE_SIZE = 50;
