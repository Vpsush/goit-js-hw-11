import axios from 'axios';
// import Notify from 'notiflix';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '39094662-f0479bb8b89274a4b188f6f08',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

export default class newsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    const url = `?&q=${this.searchQuery}&page=${this.page}`;

    const fetchByUrl = await axios.get(url);
    this.page += 1;
    console.log(fetchByUrl);
    // this.incrementPage();

    return fetchByUrl;
    // } catch (error) {
    // Notiflix.Notify.failure(
    //   'Sorry, there are no images matching your search query. Please try again.'
    // );
    // }
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
