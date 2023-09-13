// import { newGallery } from './index';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// export const renderList = (array, container) => {
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
//             <div class="photo-card" id="${id}">
//             <a class="gallery__link" href="${largeImageURL}" >
//             <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" width = 400 height=300/>
//             </a>
//         <div class="info">
//           <p class="info-item">
//             <b class="action">Likes <span class="numb"> ${likes}</span></b>
//           </p>
//           <p class="info-item">
//             <b class="action">Views <span class="numb">${views}</span></b>
//           </p>
//           <p class="info-item">
//             <b class="action">Comments <span class="numb">${comments}</span></b>
//           </p>
//           <p class="info-item">
//             <b class="action">Downloads <span class="numb">${downloads}</span></b>
//           </p>
//         </div>
//       </div>`;
//     })
//     .join('');
//   container.insertAdjacentHTML('beforeend', markup);
//   newGallery.refresh();
// };

// const newGallery = new SimpleLightbox('.photo-card a', {
//   captionsData: 'alt',
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });

// export function renderList(array, container) {
//   return array
//     .map(
//       ({
//         id,
//         largeImageURL,
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `
//               <div class="photo-card" id="${id}">
//               <a class="gallery__link" href="${largeImageURL}" >
//               <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" width = 400 height=300/>
//               </a>
//           <div class="info">
//             <p class="info-item">
//               <b class="action">Likes <span class="numb"> ${likes}</span></b>
//             </p>
//             <p class="info-item">
//               <b class="action">Views <span class="numb">${views}</span></b>
//             </p>
//             <p class="info-item">
//               <b class="action">Comments <span class="numb">${comments}</span></b>
//             </p>
//             <p class="info-item">
//               <b class="action">Downloads <span class="numb">${downloads}</span></b>
//             </p>
//           </div>
//         </div>`;
//       }
//     )
//     .join('');
//   //   container.insertAdjacentHTML('beforeend', markup);
//   //   newGallery.refresh();
// }
