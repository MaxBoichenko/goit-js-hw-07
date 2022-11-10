import { galleryItems } from './gallery-items.js';
// Change code below this line

const containerGallery = document.querySelector('.gallery');

containerGallery.innerHTML = galleryItems
  .map(({ original, preview, description }, index) => {
    return `  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        data-index="${index}";
        alt="${description}"
      />
    </a>
  </li>`;
  })
  .join('');

const instance = basicLightbox.create(
  `
    <img
        src=""
        width='800'
        height = '600'
      />
`,
  {
    onShow: instance => {
      console.log('open');
      document.addEventListener('keydown', onEscClose);
    },
    onClose: instance => {
      console.log('close');
      document.removeEventListener('keydown', onEscClose);
    },
  }
);
let currentIndex = 0;

const onImgClick = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  //   console.log(instance);
  const elem = instance.element();
  //   console.log(elem);
  elem.querySelector('img').src = event.target.dataset.source;
  currentIndex = Number(event.target.dataset.index);
  instance.show('');

  //   document.addEventListener('keydown', onEscClose);
};

function onEscClose(event) {
  //   console.log(event);

  if (event.code === 'Escape') {
    instance.close('');
  } else if (event.code === 'ArrowLeft') {
    currentIndex -= 1;
    if (currentIndex === -1) {
      currentIndex = galleryItems.length - 1;
    }
    instance.element().querySelector('img').src = galleryItems[currentIndex].original;
  } else if (event.code === 'ArrowRight') {
    currentIndex += 1;
    if (currentIndex === galleryItems.length) {
      currentIndex = 0;
    }

    instance.element().querySelector('img').src = galleryItems[currentIndex].original;
  }

  //   document.removeEventListener('keydown', onEscClose);
}

containerGallery.addEventListener('click', onImgClick);
