import {RenderPosition} from '../framework/render.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { EVENTS } from '../models/bouquets-model.js';

export default class ShowMoreButtonPresenter {
  #bouquetListContainer = null;
  #bouquetsModel = null;
  #showMoreButtonView = null;

  constructor({bouquetListContainer, bouquetsModel}) {
    this.#bouquetListContainer = bouquetListContainer;
    this.#bouquetsModel = bouquetsModel;
  }

  init() {
    this.#renderShowMoreButton();

    this.#bouquetsModel.addObserver(
      EVENTS.ALL_BOUQUETS_DISPLAYED,
      () => {
        this.#showMoreButtonView.hide();
      }
    );

    this.#bouquetsModel.addObserver(
      EVENTS.BOUQUETS_PART_DISPLAYED,
      () => {
        this.#showMoreButtonView.show();
      }
    );
  }

  #renderShowMoreButton() {
    const onClick = () => {
      this.#bouquetsModel.addDisplayedBouquets();
    };
    const showMoreButtonView = new ShowMoreButtonView({ onClick });
    this.#showMoreButtonView = showMoreButtonView;
    this.#bouquetListContainer.add(this.#showMoreButtonView, RenderPosition.AFTEREND);
  }
}
