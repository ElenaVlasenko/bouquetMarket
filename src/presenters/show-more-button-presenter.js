import {RenderPosition} from '../framework/render.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { EVENTS } from '../models/bouquets-model.js';

export default class ShowMoreButtonPresenter {
  #bouquetListContainer = null;
  #bouquetsModel = null;
  #showMoreButtonView = null;

  // constructor({movieCardsContainer, moviesModel}) {
  //   this.#movieCardsContainer = movieCardsContainer;
  //   this.#moviesModel = moviesModel;
  // }
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

  //   this.#moviesModel.addObserver(
  //     EVENTS.MOVIES_PART_DISPLAYED,
  //     () => {
  //       this.#showMoreButtonView.show();
  //     }
  //   );

  //   this.#moviesModel.addObserver(
  //     EVENTS.DATA_LOADING_ERROR,
  //     () => {
  //       this.#showMoreButtonView.hide();
  //     }
  //   );
  }
  // #renderShowMoreButton() {
  //   const onClick = () => {
  //     this.#moviesModel.addDisplayedMovies();
  //   };
  //   const showMoreButtonView = new ShowMoreButtonView({ onClick });
  //   this.#showMoreButtonView = showMoreButtonView;
  //   this.#movieCardsContainer.add(this.#showMoreButtonView, RenderPosition.AFTEREND);
  // }

  #renderShowMoreButton() {
    const showMoreButtonView = new ShowMoreButtonView();
    this.#showMoreButtonView = showMoreButtonView;
    this.#bouquetListContainer.add(this.#showMoreButtonView, RenderPosition.AFTEREND);
  }
}
