import PopupDeferredView from '../view/popup-deferred-view.js';
import { modals } from '../modals/init-modals';
import { EVENTS } from '../models/bouquets-model.js';

export default class PopupDeferredPresenter {

  #popupContainer = null;
  #popupView = null;

  constructor({ popupContainer, bouquetsModel }) {
    this.#popupContainer = popupContainer;
    this.bouquetsModel = bouquetsModel;
  }

  init() {
    this.bouquetsModel.addObserver(
      EVENTS.CART_UPDATED,
      (cart) => {
        if (this.#popupView) {
          const params = this.#getViewParams();
          this.#popupView.updateElement(params);
        }
      }
    );
  }

  renderPopup() {
    modals.open('popup-data-attr');

    const onCancel = () => {
      this.#clearPopup();
    };

    const onClear = () => {
      this.bouquetsModel.deleteFromCart();
    };

    const onEsc = () => {
      this.#clearPopup();
    };

    this.#popupContainer.clear();

    const params = this.#getViewParams();
    this.#popupView = new PopupDeferredView(
      params,
      {
        onCancel,
        onEsc,
        onClear,
      }
    );

    this.#popupContainer.add(this.#popupView);
  }

  #getViewParams() {
    const cart = this.bouquetsModel.cart;
    const bouquets = this.bouquetsModel.getBouquets(Object.keys(cart.products));
    return { cart, bouquets };
  }

  #clearPopup() {
    this.#popupView = null;
    this.#popupContainer.clear();
  }

}
