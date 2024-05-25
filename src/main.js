//import SimpleLightbox from 'simplelightbox';
//import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createMarkupFunction } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';
const imagesContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');
const loadMore = document.querySelector('.btn');


let searchQuery = '';
let page = 1;
let limit = 15;
let totalPages = 0;
let lightbox = null;

async function fetchAndRenderPhotosFunction() {
  try {
    const imagesData = await fetchPhotos(searchQuery, page);



    totalPages = Math.ceil(imagesData.totalHits / limit); //рахуємо загальну кількість сторінок


    //перевіряєио правильність і наявність картинок

    if (imagesData.hits.length === 0 && page === 1) {
      iziToast.error({
        position: 'topRight',
        timeout: 2000,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loadMore.classList.add('is-hidden');
      loaderEl.classList.add('is-hidden');
      return;
    }

    const initialHeight = imagesContainer.getBoundingClientRect().height;
   
//adding the new photos to a container
    imagesContainer.insertAdjacentHTML('beforeend', createMarkupFunction(imagesData.hits));



    const newHeight = imagesContainer.getBoundingClientRect().height;
    const scrollByHeight = newHeight - initialHeight;

    window.scrollBy({
      top: scrollByHeight,
      behavior: 'smooth',
    });

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 250,
      });
    } else {
      //lightbox.refresh();
    }
//checking if we reached a limit of pages
    if (page >= totalPages || imagesData.hits.length < limit) {
      loadMore.classList.add('is-hidden');
    } else {
      loadMore.classList.remove('is-hidden');
    }

    loaderEl.classList.add('is-hidden');
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      timeout: 2000,
      message: 'Sorry, something went wrong. Please try again!',
    });
    console.log(error)
    loaderEl.classList.add('is-hidden');
    loadMore.classList.remove('is-hidden');
  }
}
//search button editing function 
async function onSearch(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchKeyword.value.trim();
  imagesContainer.innerHTML = '';
  page = 1;
  loadMore.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');
//checking the validity of an input
  if (searchQuery === '') {
    iziToast.error({
      position: 'topRight',
      timeout: 2000,
      message: 'Please enter a search query!',
    });
    loaderEl.classList.add('is-hidden');
    return;
  }
  await fetchAndRenderPhotosFunction();
  event.target.reset();
}
//on clicking load more button 
async function onLoadMore() {
  page += 1;
  loadMore.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');
  await fetchAndRenderPhotosFunction();
}




//the main calling and event listeners 
searchForm.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);
