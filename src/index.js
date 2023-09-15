import Notify from 'notiflix';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewsApiService } from './api-service';
import { renderList } from './makeList';

const writeInForm = document.querySelector('#search-form');
const galleryFill = document.querySelector('.gallery');
const newsApiService = new NewsApiService();

let isShown = 0;
let isTotal = 0;

writeInForm.addEventListener('submit', searchSubmitPictures);

async function searchSubmitPictures(e) {
  e.preventDefault();
  clearPictureContainer();

  window.addEventListener('scroll', scrolling);

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
    .then(({ hits, totalHits }) => {
      const markup = renderList(hits);
      isTotal = totalHits;
      galleryFill.insertAdjacentHTML('beforeend', markup);

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      } else {
        renderList(hits, galleryFill);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }
    })
    .catch(error => console.log(error));
}

async function loadMore() {
  const isPage = newsApiService.getPage();
  console.log(isPage > Math.ceil(isTotal / 40));
  if (isPage > Math.ceil(isTotal / 40)) {
    window.removeEventListener('scroll', scrolling);
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
    return;
  }
  try {
    const { hits } = await newsApiService.fetchArticles();
    const markup = renderList(hits);
    galleryFill.insertAdjacentHTML('beforeend', markup);
    if (hits.length > 0) {
      renderList(hits, galleryFill);
      return;
    }
    if (hits.length < 40) {
      window.removeEventListener('scroll', scrolling);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

function scrolling() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadMore();
  }
}

function clearPictureContainer() {
  galleryFill.innerHTML = '';
}

const newGallery = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
