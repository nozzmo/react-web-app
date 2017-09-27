// @flow
import { MEDIA_BASE_URL } from '../settings';

export const buildMediaURL = (url: string) =>
  typeof(url) === 'undefined' ||
  url.includes(MEDIA_BASE_URL)? url: `${MEDIA_BASE_URL}${url}`;
