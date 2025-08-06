'use strict';

import axios from 'axios';

async function getImagesByQuery(query, page = 1) {
  const API_KEY = '51218817-9c6b1fab233f845d5e532ac94';
  const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(query) +
    '&per_page=15' +
    `&page=${page}` +
    '&image_type=photo' +
    '&orientation=horizontal' +
    '&safesearch=true';

  return axios
    .get(URL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return [];
    });
}

export default getImagesByQuery;
