import './sass/_common.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  '39094662-f0479bb8b89274a4b188f6f08';

const writeInForm = document.querySelector('#search-form');
const galleryFill = document.createElement('div');
galleryFill.class = 'gallery';

const BASE_URL = 'https://pixabay.com/api/';
const MY_API = '39094662-f0479bb8b89274a4b188f6f08';

//pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
// https://pixabay.com/api/?key=39094662-f0479bb8b89274a4b188f6f08&q=yellow+flowers&image_type=photo

writeInForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value;

  // const options = {
  //   headers: {
  //     Authorization: 'MY_API',
  //   },
  // };
  const url = `${BASE_URL}?key=${MY_API}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=10&page=1`;

  try {
    const fetchByUrl = await axios
      .get(url)
      .then(r => r.json())
      .then(console.log);
    const information = await fetchByUrl.json();
    return information;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
function renderList(pictures) {
  if (!gallery) {
  }
  const markup = pictures
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
      <div class="gallery">
      <a class="gallery__link" href="${largeImageURL}">
        <div class="gallery-item" id="${id}">
          <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b>${likes}</p>
            <p class="info-item"><b>Views</b>${views}</p>
            <p class="info-item"><b>Comments</b>${comments}</p>
            <p class="info-item"><b>Downloads</b>${downloads}</p>
          </div>
        </div>
      </a>
      </div>
    `;
    })
    .join('');
  galleryFill.innerHTML = markup;
}
