import FilterReasonView from '../view/filter-reason-view.js';
import { EVENTS } from '../models/bouquets-model.js';

export default class FilterReasonPresenter {
  #filterReasonContainer = null;
  #filterReasonView = null;

  constructor({ filterReasonContainer, bouquetsModel }) {
    this.#filterReasonContainer = filterReasonContainer;
    this.bouquetsModel = bouquetsModel;
  }

  init() {
    this.bouquetsModel.addObserver(
      EVENTS.SELECTED_REASON_FILTER_CHANGED,
      () => this.#filterReasonView.updateElement({ selectedFilter: this.bouquetsModel.selectedReasonFilter })
    );

    this.#filterReasonView = new FilterReasonView({ selectedFilter: this.bouquetsModel.selectedReasonFilter }, {
      onFilterClick: (filterType) => {
        this.bouquetsModel.setReasonFilter(filterType);
      },
    });
    this.#filterReasonContainer.add(this.#filterReasonView);
  }
}
