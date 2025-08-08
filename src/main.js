'use strict';

import {
  createGallery,
  clearGallery,
  hideLoader,
  showLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadBtn = document.querySelector('.load__button');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  showLoader();
  hideLoadMoreButton();
  clearGallery();

  await fetchImages();
});

loadBtn.addEventListener('click', async () => {
  currentPage++;
  await fetchImages();
});

async function fetchImages() {
  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.error({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    const totalLoaded = document.querySelectorAll('.gallery__item').length;

    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'The End',
        message: 'We`re sorry, but you`ve reached the end of search results.',
      });
    } else {
      showLoadMoreButton();
    }

    if (currentPage > 1) {
      scrollPage();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery__item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}
