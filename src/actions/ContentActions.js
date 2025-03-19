import axios from 'axios';
import { ERR_CONTENT, FETCH_CONTENT } from './types';

const baseUrl = import.meta.env.VITE_CONTENTFUL_BASE_URL || 'https://cdn.contentful.com';
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID || 'mdzsjlndbpyg';
const accessToken =
  import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN ||
  '36d90c6a12c51b012bc6bd876dfc8bb7ab764f6aaff19b1e995c7606a327fee8';

export const fetchContent = (contentId) => (dispatch) => {
  axios
    .get(
      `${baseUrl}/spaces/${spaceId}/entries/${contentId}?access_token=${accessToken}`
    )
    .then((response) => {
      dispatch({ type: FETCH_CONTENT, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: ERR_CONTENT, payload: err });
    });
};
