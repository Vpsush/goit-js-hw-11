// import './sass/_common.scss';
import Notify from 'notiflix';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewsApiService } from './api-service';
import { renderList } from './makeList';

const writeInForm = document.querySelector('#search-form');
const galleryFill = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();

let isShown = 0;

writeInForm.addEventListener('submit', searchSubmitPictures);

// loadMoreBtn.addEventListener('click', loadMore);

async function searchSubmitPictures(e) {
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

  await newsApiService
    .fetchArticles()
    .then(pictures => {
      const markup = renderList(pictures);
      galleryFill.insertAdjacentHTML('beforeend', markup);
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
  try {
    const pictures = await newsApiService.fetchArticles();
    const markup = renderList(pictures);
    galleryFill.insertAdjacentHTML('beforeend', markup);
    // .then(pictures => {
    if (pictures.length > 0) {
      renderList(pictures, galleryFill);
      return;
      // } else {
      //   loadMoreBtn.disabled = true;
    }
  } catch (error) {
    console.log(error);
  }
  fetchInGallery();
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadMore();
  }
});

// const renderList = (array, container) => {
//   const markup = array
//     .map(picture => {
//       const {
//         id,
//         largeImageURL,
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       } = picture;
//       return `
//         <div class="photo-card" id="${id}">
//         <a class="gallery__link" href="${largeImageURL}" >
//         <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" width = 400 height=300/>
//         </a>
//     <div class="info">
//       <p class="info-item">
//         <b class="action">Likes <span class="numb"> ${likes}</span></b>
//       </p>
//       <p class="info-item">
//         <b class="action">Views <span class="numb">${views}</span></b>
//       </p>
//       <p class="info-item">
//         <b class="action">Comments <span class="numb">${comments}</span></b>
//       </p>
//       <p class="info-item">
//         <b class="action">Downloads <span class="numb">${downloads}</span></b>
//       </p>
//     </div>
//   </div>`;
//     })
//     .join('');
//   container.insertAdjacentHTML('beforeend', markup);
//   newGallery.refresh();
// };

function clearPictureContainer() {
  galleryFill.innerHTML = '';
}

const newGallery = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

async function fetchInGallery() {
  const result = await newsApiService.fetchArticles();
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
