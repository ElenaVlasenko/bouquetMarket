import PopupView from "../view/popup-view.js";

export default class PopupPresenter {

  #popupContainer = null;
  #popupView = null;

  constructor({ popupContainer, bouquetsModel }) {
    this.#popupContainer = popupContainer;
    this.bouquetsModel = bouquetsModel;
  }

  init() {
  }

  renderPopup({ bouquet }) {
    const onCancel = () => {
      this.#clearPopup();
    };

    const onEsc = () => {
      this.#clearPopup();
    };

    this.#popupContainer.clear();

    this.#popupView = new PopupView({ bouquet }, {
      onCancel,
      onEsc,
    });

    this.#popupContainer.add(this.#popupView);
  }

  #clearPopup() {
    this.#popupView = null;
    this.#popupContainer.clear();
  }

}
