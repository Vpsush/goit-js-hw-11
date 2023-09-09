// import './sass/_common.scss';
import Notify from 'notiflix';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { NewsApiService } from './api-service';

const writeInForm = document.querySelector('#search-form');
const galleryFill = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();
let isShown = 0;

loadMoreBtn.classList.replace('is-hidden', 'loadMoreBtn');

writeInForm.addEventListener('submit', searchSubmitPictures);
loadMoreBtn.addEventListener('click', loadMore);

function searchSubmitPictures(e) {
  e.preventDefault();
  loadMoreBtn.classList.replace('is-hidden', 'loadMoreBtn');

  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();

  if (newsApiService.query === '') {
    Notiflix.Notify.warning('Please, fill the main field');
    return;
  }

  // fetchGallery();

  newsApiService
    .fetchArticles()
    .then(pictures => renderList(pictures, galleryFill))
    .catch(error => console.log(error));

  const result = newsApiService.fetchArticles();
  const { hits, total } = result;
  isShown += hits.length;
  if (!hits.length) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );

    if (isShown < hits.length) {
      Notify.success(`Hooray! We found ${total} images.`);
    }
    if (isShown >= hits.length) {
      Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  }
  loadMoreBtn.classList.replace('is-hidden', 'loadMoreBtn');
}

function loadMore(e) {
  e.preventDefault();
  newsApiService
    .fetchArticles()
    .then(pictures => renderList(pictures, galleryFill))
    .catch(error => console.log(error));
}

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
        <a class="gallery__link" href="${largeImageURL}" >
        <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" width = 400 height=300/>
        </a>
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
// async function fetchGallery(e) {
//   e.preventDefault();
// const result = await newsApiService.fetchGallery();
// const { hits, total } = result;
// isShown += hits.length;
// if (!hits.length) {
//   Notify.failure(
//     `Sorry, there are no images matching your search query. Please try again.`
//   );

//   if (isShown < hits.length) {
//     Notify.success(`Hooray! We found ${total} images.`);
//   }
//   if (isShown >= hits.length) {
//     Notiflix.Notify.failure(
//       `We're sorry, but you've reached the end of search results.`
//     );
//   }
// }

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
