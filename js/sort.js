import { renderGallery } from './renderGallery';
import { debounce } from './util';

const PICTURE__COUNT = 10;
const Sorting = {
  DEFAUIT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const sortElement = document.querySelector('.img-filters');

const debouncerRenderPictures = debounce(renderGallery);
const sortRandom = () => Math.random() - 0.5;
const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
let currentSort = Sorting.DEFAULT;
let pictures = [];

const container = document.querySelector('.pictures');
const getSortPictures = () => {
  switch (currentSort) {
    case Sorting.RANDOM:
      return [...pictures].sort(sortRandom).slice(0, PICTURE__COUNT);
    case Sorting.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return pictures;
  }
};

const setOnSortElementClick = () => {
  sortElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton.id === currentSort) {
      return;
    }
    sortElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentSort = clickedButton.id;
    container.querySelectorAll('.picture').forEach((element) => element.remove());
    debouncerRenderPictures(getSortPictures());
  });
};

const init = (loaderPictures) => {
  sortElement.classList.remove('img-filters--inactive');
  pictures = [...loaderPictures];
  setOnSortElementClick();
};

export {init, getSortPictures};

