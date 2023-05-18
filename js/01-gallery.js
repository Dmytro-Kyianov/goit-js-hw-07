import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryEl = document.querySelector('.gallery')
const itemsMarkup = createGalleryMarkup (galleryItems)

function createGalleryMarkup (galleryItems) {
return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"/>
  </a>
    </li>`;
}).join('');
}

galleryEl.insertAdjacentHTML('beforeend', itemsMarkup);

galleryEl.addEventListener('click', onItemClick);
function onItemClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") {
        return;
    }
    openModal(e.target)
};

let modalWindow

function openModal (img) {
modalWindow = basicLightbox.create(
  `<img src="${img.dataset.source}"/>`,
  {
    onShow: modalWindow => {
      window.addEventListener('keydown', closeByEsc);
    },
    onClose: modalWindow => {
      window.removeEventListener('keydown', closeByEsc);
    },
  }
);
modalWindow.show();
}
function closeByEsc ({code}) {
    if (code === 'Escape') {
        modalWindow.close()
    }
}