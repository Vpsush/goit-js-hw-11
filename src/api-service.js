// import axios from 'axios';
// // import Notify from 'notiflix';

import axios from 'axios';
// import Notiflix from 'notiflix';

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.params = {
//   key: '39094662-f0479bb8b89274a4b188f6f08',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   per_page: 40,
// };

// export class NewsApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   async fetchArticles() {
//     try {
//       const url = `?&q=${this.searchQuery}&page=${this.page}`;
//       const fetchByUrl = await axios.get(url);
//       this.page += 1;
//       return fetchByUrl.data.hits;
//     } catch (error) {
//       // Notiflix.Notify.failure(
//       //   'Sorry, there are no images matching your search query. Please try again.'
//       // );
//       throw error;
//     }
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '39094662-f0479bb8b89274a4b188f6f08',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

// Create a cancel token source
const cancelTokenSource = axios.CancelToken.source();

export class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    try {
      // Cancel the previous request before making a new one
      cancelTokenSource.cancel('Previous request canceled');
      cancelTokenSource.token = axios.CancelToken.source().token;

      const url = `?&q=${this.searchQuery}&page=${this.page}`;
      const fetchByUrl = await axios.get(url, {
        cancelToken: cancelTokenSource.token,
      });
      this.page += 1;
      return fetchByUrl.data.hits;
    } catch (error) {
      throw error;
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
