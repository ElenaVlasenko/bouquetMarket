import SortView from "../view/sort-view.js";
import { EVENTS } from "../models/bouquets-model.js";

export default class SortPresenter {
  #sortContainer = null;
  #sortView = null;

  constructor({ sortContainer, bouquetsModel }) {
    this.#sortContainer = sortContainer;
    this.bouquetsModel = bouquetsModel;
  }

  init() {
    this.bouquetsModel.addObserver(
      EVENTS.SORTING_ORDER_CHANGED,
      () => {
        console.log(11111111);
        return this.#sortView.updateElement({ sortingOrder: this.bouquetsModel.sortingOrder });
      }
    );

    this.#sortView = new SortView({
      sortingOrder: this.bouquetsModel.sortingOrder
    }, {
      onClick: (sortingOrder) => {
        this.bouquetsModel.setSortingOrder(sortingOrder);
      },
    });
    this.#sortContainer.add(this.#sortView);
  }
}
