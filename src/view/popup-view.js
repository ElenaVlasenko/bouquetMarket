import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { ImageSlider } from '../utils/image-slider.js';
import { getPriceString } from '../utils/get-price-string.js';

function createSliderItem(image) {
  return `
  <div class="image-slides-list__item swiper-slide">
    <div class="image-slide">
      <picture>
        <source type="image/webp" srcset="${image}"><img src="${image}" srcset="${image}" width="1274" height="1789" alt="">
        <span class="image-author image-slide__author">Автор  фотографии:  «Christie Kim»</span>
      </picture>
    </div>
  </div>
  `;
}

function createTemplate({ bouquet }) {
  const { price, title, description, images } = bouquet;

  return `
    <div class="modal-product">
    <button class="btn-close modal-product__btn-close" type="button" data-close-modal aria-label="Закрыть">
      <svg width="55" height="56" aria-hidden="true">
        <use xlink:href="#icon-close-big"></use>
      </svg>
    </button>
    <svg class="modal-product__btn-close modal-product__loader" width="56" height="56" aria-hidden="true">
      <use xlink:href="#icon-loader"></use>
    </svg>
    <div class="image-slider swiper modal-product__slider">
      <div class="image-slides-list swiper-wrapper">
        ${images.map(image => createSliderItem(image))}
      </div>
      <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev" type="button">
        <svg width="80" height="85" aria-hidden="true" focusable="false">
          <use xlink:href="#icon-round-button"></use>
        </svg>
      </button>
      <button class="btn-round btn-round--to-right image-slider__button image-slider__button--next" type="button">
        <svg width="80" height="85" aria-hidden="true" focusable="false">
          <use xlink:href="#icon-round-button"></use>
        </svg>
      </button>
    </div>
    <div class="product-description">
      <div class="product-description__header">
        <h3 class="title title--h2">${title}</h3><b class="price price--size-big">${getPriceString(price)}<span>Р</span></b>
      </div>
      <p class="text text--size-40">${description}</p>
      <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus>отложить</button>
    </div>
  </div>
  `;
}

export default class PopupView extends AbstractStatefulView {

  #handlePopupEsc = null;
  #handleAddToCartButtonClick

  constructor({ bouquet }, { onCancel, onEsc, onAddToCartButtonClick }) {
    super();
    this.#handlePopupEsc = onEsc;
    this.#handleAddToCartButtonClick = onAddToCartButtonClick;
    this._setState({ bouquet });
    this._restoreHandlers();
  }

  get element() {
    const element = super.element;
    const sliderContainer = element.querySelector('.image-slider');
    const imageSlider = new ImageSlider(sliderContainer);
    imageSlider.init();
    return element;
  }

  get template() {
    return createTemplate(this._state);
  }

  _restoreHandlers() {
    this.#addOnEscHandler();
    this.#addOnAddToCartButtonClickHandler();
  }

  #addOnAddToCartButtonClickHandler() {
    const buttonElement = this.element.querySelector('.product-description__button');

    buttonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#handleAddToCartButtonClick(this._state.bouquet.id);
    });
  }

  #addOnEscHandler() {
    document.addEventListener('keydown', this.#escHandler);
  }

  #escHandler = (evt) => {
    if (evt.code === 'Escape') {
      evt.preventDefault();
      this.#removeKeyListteners();
      this.#handlePopupEsc();
    }
  };

  #removeKeyListteners() {
    document.removeEventListener('keydown', this.#escHandler);
  }
}
