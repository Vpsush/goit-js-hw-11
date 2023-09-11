// import './sass/_common.scss';
import Notify from 'notiflix';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewsApiService } from './api-service';

const writeInForm = document.querySelector('#search-form');
const galleryFill = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();
const guardEl = document.querySelector('.js-guard');
let isShown = 0;

// const options = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 0,
// };

// const observer = new IntersectionObserver(loadMore, options);

// loadMoreBtn.classList.replace('is-hidden', 'loadMoreBtn');

// writeInForm.addEventListener('submit', searchSubmitPictures);
// loadMoreBtn.addEventListener('click', loadMore);

// function searchSubmitPictures(e) {
//   e.preventDefault();
//   clearPictureContainer();

//   isShown = 0;

//   newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
//   newsApiService.resetPage();

//   if (newsApiService.query === '') {
//     Notiflix.Notify.warning('Please, fill the main field');
//     return;
//   }
//   newGallery.refresh();

//   newsApiService
//     .fetchArticles()
//     .then(pictures => {
//       // Check if there are no images and show a message
//       if (pictures.length === 0) {
//         Notiflix.Notify.failure(
//           `Sorry, there are no images matching your search query. Please try again.`
//         );
//         return;
//       } else {
//         renderList(pictures, galleryFill);
//       }
//     })
//     .catch(error => console.log(error));
// }

// async function loadMore(e) {
//   // e.preventDefault();

//   await newsApiService
//     // .incrementPage()
//     .fetchArticles()
//     .then(pictures => renderList(pictures, galleryFill))
//     .catch(error => console.log(error));
//   fetchGallery();
// }

writeInForm.addEventListener('submit', searchSubmitPictures);

// loadMoreBtn.addEventListener('click', loadMore);

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  const threshold = 0.1 * windowHeight;

  if (scrollY + windowHeight >= documentHeight - threshold) {
    loadMore();
  }
});

function searchSubmitPictures(e) {
  e.preventDefault();
  clearPictureContainer();

  isShown = 0;

  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();

  if (newsApiService.query === '') {
    Notiflix.Notify.warning('Please, fill the main field');
    return;
  }
  newGallery.refresh();

  newsApiService
    .fetchArticles()
    .then(pictures => {
      // Check if there are no images and show a message
      if (pictures.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      } else {
        renderList(pictures, galleryFill);
      }
    })
    .catch(error => console.log(error));
}

async function loadMore() {
  // Check if the button is disabled, if so, return
  if (loadMoreBtn.disabled) {
    return;
  }

  await newsApiService
    // .incrementPage()
    .fetchArticles()
    .then(pictures => {
      if (pictures.length > 0) {
        renderList(pictures, galleryFill);
      }
      // } else {
      //   loadMoreBtn.disabled = true; // Disable the button
      // }
    })
    .catch(error => console.log(error));
  fetchGallery();
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
        <b class="action">Likes <span class="numb"> ${likes}</span></b>
      </p>
      <p class="info-item">
        <b class="action">Views <span class="numb">${views}</span></b>
      </p>
      <p class="info-item">
        <b class="action">Comments <span class="numb">${comments}</span></b>
      </p>
      <p class="info-item">
        <b class="action">Downloads <span class="numb">${downloads}</span></b>
      </p>
    </div>
  </div>`;
    })
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
  newGallery.refresh();
};

function clearPictureContainer() {
  galleryFill.innerHTML = '';
}

const newGallery = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

async function fetchGallery(e) {
  const result = await newsApiService.fetchGallery();
  const { hits, total } = result;
  isShown += hits.length;
  if (!hits.length) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    return;
  }

  renderList(hits);
  isShown += hits.length;

  if (isShown < total) {
    Notify.success(`Hooray! We found ${total} images.`);
  }
  if (isShown >= total) {
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
  }
}

//

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.fetchArticles();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
