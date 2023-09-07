import './sass/_common.scss';
import { fetchArticles } from './api-service';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import NewsApiService from './api-service';
// axios.defaults.headers.common['x-api-key'] =
//   '39094662-f0479bb8b89274a4b188f6f08';

const writeInForm = document.querySelector('#search-form');
const galleryFill = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();

writeInForm.addEventListener('submit', searchSubmitPictures);
loadMoreBtn.addEventListener('click', loadMore);

function searchSubmitPictures(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then;
}
function loadMore() {
  newsApiService.fetchArticles();
}
fetchArticles()
  .then(pictures => renderList(pictures))
  .catch(error => console.log(error));
// const searchSubmitPictures = e => {
//   e.preventDefault();
// };
const renderList = (array, container) => {
  const markup = array
    .map(picture => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = picture;
      return `
        <div class="photo-card" id="${id}">
        <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
  </div>`;
    })
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
};
