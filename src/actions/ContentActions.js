import { FETCH_CONTENT, ERR_CONTENT } from './types';
import axios from 'axios';

const baseUrl = process.env.CONTENTFUL_BASE_URL || 'https://cdn.contentful.com';
const spaceId = process.env.CONTENTFUL_SPACE_ID || 'mdzsjlndbpyg';
const accessToken =
  process.env.CONTENTFUL_ACCESS_TOKEN ||
  '36d90c6a12c51b012bc6bd876dfc8bb7ab764f6aaff19b1e995c7606a327fee8';

export const fetchContent = (contentId) => (dispatch) => {
  axios
    .get(
      `${baseUrl}/spaces/${spaceId}/entries/${contentId}?access_token=${accessToken}`
    )
    .then((response) => {
      console.log(response);
      dispatch({ type: FETCH_CONTENT, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ERR_CONTENT, payload: err });
    });
};
