import HeaderView from '../view/header-view.js';
import { EVENTS } from '../models/bouquets-model.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #headerView = null;
  #popupDeferredPresenter = null;

  constructor({ headerContainer, bouquetsModel, popupDeferredPresenter }) {
    this.#headerContainer = headerContainer;
    this.#popupDeferredPresenter = popupDeferredPresenter;
    this.bouquetsModel = bouquetsModel;
  }

  init() {
    this.bouquetsModel.addObserver(
      EVENTS.CART_UPDATED,
      (cart) => {
        return this.#headerView.updateElement({ cart });
      }
    );

    this.#headerView = new HeaderView(
      { cart: this.bouquetsModel.cart },
      {
        onClick: () => {
          this.#popupDeferredPresenter.renderPopup();
        },
      }
    );
    this.#headerContainer.add(this.#headerView);
  }
}
