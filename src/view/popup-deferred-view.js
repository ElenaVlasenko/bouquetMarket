import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getPriceString } from '../utils/get-price-string.js';

function createBouquetItem(bouquet, count = 10) {
  const { previewImage, title, description, price } = bouquet;
  return `
  <li class="popup-deferred__item">
    <div class="deferred-card">
      <div class="deferred-card__img">
        <picture>
          <source type="image/webp" srcset="${previewImage}"><img src="${previewImage}" srcset="${previewImage}" width="233" height="393" alt="букет">
        </picture>
      </div>
      <div class="deferred-card__content">
        <h2 class="title title--h2">${title}</h2>
        <p class="text text--size-40">${description}</p>
      </div>
      <div class="deferred-card__count">
        <button class="btn-calculate" type="button">
          <svg width="30" height="27" aria-hidden="true">
            <use xlink:href="#icon-minus"></use>
          </svg>
        </button><span>${count}</span>
        <button class="btn-calculate" type="button">
          <svg width="30" height="28" aria-hidden="true">
            <use xlink:href="#icon-cross"></use>
          </svg>
        </button>
      </div>
      <div class="deferred-card__price"><b class="price price--size-middle-p">${getPriceString(price)}<span>Р</span></b>
      </div>
      <button class="btn-close deferred-card__close-btn" type="button">
        <svg width="55" height="56" aria-hidden="true">
          <use xlink:href="#icon-close-big"></use>
        </svg>
      </button>
      <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
        <use xlink:href="#icon-loader"></use>
      </svg>
    </div>
  </li>
  `;
}

function createTemplate({ cart, bouquets }) {
  const { sum, productCount, products } = cart;

  return `
<div class="popup-deferred__wrapper">
  <section class="hero hero--popup">
    <div class="hero__wrapper">
      <div class="hero__background">
        <picture>
          <source type="image/webp" srcset="img/content/hero-back-popup.webp, img/content/hero-back-popup@2x.webp 2x"><img src="img/content/hero-back-popup.jpg" srcset="img/content/hero-back-popup@2x.jpg 2x" width="1770" height="601" alt="фоновая картинка">
        </picture>
      </div>
      <div class="hero__content">
        <h2 class="title title--h1">Вас<br>заинтересовали</h2>
        <button class="btn-close btn-close--dark modal-product__btn-close hero__popupclose" type="button" data-close-modal aria-label="Закрыть">
          <svg width="56" height="54" aria-hidden="true">
            <use xlink:href="#icon-union"></use>
          </svg>
        </button>
        <div class="btn-close btn-close--dark hero__loader">
          <svg class="hero__loader-icon" width="56" height="56" aria-hidden="true">
            <use xlink:href="#icon-loader"></use>
          </svg>
        </div>
      </div>
    </div>
  </section>
  <div class="popup-deferred__container">
    <a class="btn btn--with-icon popup-deferred__btn btn--light" href="#">в&nbsp;каталог
      <svg width="61" height="24" aria-hidden="true">
        <use xlink:href="#icon-arrow"></use>
      </svg>
    </a>
    <ul class="popup-deferred__catalog">
      ${bouquets.map((bouquet) => createBouquetItem(bouquet, products[bouquet.id]))}
    </ul>
    <div class="popup-deferred__btn-container">
      <button class="btn btn--with-icon popup-deferred__btn-clean" type="button">очистить
        <svg width="61" height="24" aria-hidden="true">
          <use xlink:href="#icon-arrow"></use>
        </svg>
      </button>
    </div>
    <div class="popup-deferred__sum">
      <p class="text text--total">Итого вы выбрали:</p>
      <div class="popup-deferred__block-wrap">
        <div class="popup-deferred__block">
          <p class="text text--total">Букеты</p><span class="popup-deferred__count" data-atribut="count-defer">${productCount}</span>
        </div>
        <div class="popup-deferred__block">
          <p class="text text--total">Сумма</p><b class="price price--size-middle-p">${getPriceString(sum)}<span>Р</span></b>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

export default class PopupDeferredView extends AbstractStatefulView {

  #handlePopupEsc = null;
  #handleClearButtonClick

  constructor(params, { onClear, onEsc }) {
    super();
    this.#handlePopupEsc = onEsc;
    this.#handleClearButtonClick = onClear;
    this._setState(params);
    this._restoreHandlers();
  }

  get template() {
    return createTemplate(this._state);
  }

  _restoreHandlers() {
    this.#addOnEscHandler();
    this.#addOnAddClearButtonClickHandler();
  }

  #addOnAddClearButtonClickHandler() {
    const buttonElement = this.element.querySelector('.popup-deferred__btn-clean');

    buttonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#handleClearButtonClick();
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
