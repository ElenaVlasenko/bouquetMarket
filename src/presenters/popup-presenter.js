import PopupView from '../view/popup-view.js';

export default class PopupPresenter {

  #popupContainer = null;
  #popupView = null;

  constructor({ popupContainer, bouquetsModel }) {
    this.#popupContainer = popupContainer;
    this.bouquetsModel = bouquetsModel;
  }

  renderPopup({ bouquet }) {
    const onCancel = () => {
      this.#clearPopup();
    };

    const onEsc = () => {
      this.#clearPopup();
    };

    this.#popupContainer.clear();

    const onAddToCartButtonClick = (id) => {
      this.bouquetsModel.addToCart(id).catch((err) => {
        throw err;
      });
    };


    this.#popupView = new PopupView({ bouquet }, {
      onCancel,
      onEsc,
      onAddToCartButtonClick,
    });

    this.#popupContainer.add(this.#popupView);
  }

  #clearPopup() {
    this.#popupView = null;
    this.#popupContainer.clear();
  }

}
