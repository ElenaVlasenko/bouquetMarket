import FilterColorView from "../view/filter-color-view.js";
import { EVENTS } from "../models/bouquets-model.js";

export default class FilterColorPresenter {
  #filterColorContainer = null;
  #filterColorView = null;

  constructor({ filterColorContainer, bouquetsModel }) {
    this.#filterColorContainer = filterColorContainer;
    this.bouquetsModel = bouquetsModel;
  }

  init() {
    this.bouquetsModel.addObserver(
      EVENTS.SELECTED_COLOR_FILTER_CHANGED,
      () => this.#filterColorView.updateElement({ selectedFilter: this.bouquetsModel.selectedColorFilter })
    );

    this.#filterColorView = new FilterColorView({ selectedFilter: this.bouquetsModel.selectedColorFilter }, {
      onFilterClick: (filterType) => {
        this.bouquetsModel.setColorFilter(filterType);
      },
    });

    this.#filterColorContainer.add(this.#filterColorView);
  }
}
