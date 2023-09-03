import './sass/_common.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  '39094662-f0479bb8b89274a4b188f6f08';

const writeInForm = document.querySelector('#search-form');

const BASE_URL = 'https://pixabay.com/api/';
const MY_API = '39094662-f0479bb8b89274a4b188f6f08';

//pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
// https://pixabay.com/api/?key=39094662-f0479bb8b89274a4b188f6f08&q=yellow+flowers&image_type=photo

writeInForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
}
