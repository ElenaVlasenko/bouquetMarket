import BouquetCardView from "../view/bouquet-card-view";
import { EVENTS } from "../models/bouquets-model.js";
import { modals, initModals } from "../modals/init-modals";

export default class BouquetCardsPresenter {
  #bouquetsContainer = null;
  bouquetsModel = null;
  #popupPresenter = null;

  constructor({ bouquetListContainer, bouquetsModel, popupPresenter }) {
    this.#bouquetsContainer = bouquetListContainer;
    this.bouquetsModel = bouquetsModel;
    this.#popupPresenter = popupPresenter;
  }

  init() {
    initModals();
    // this.#preLoadMoviesMessageView = new PreLoadMoviesMessageView('Loading...');
    // this.#cardsContainer.add(this.#preLoadMoviesMessageView);

    this.bouquetsModel.addObserver(EVENTS.DISPLAYED_BOUQUETS_ADDED, (bouquets) => this.#onDisplayedBouquetsAdded(bouquets));

    this.bouquetsModel.addObserver(
      EVENTS.SELECTED_REASON_FILTER_CHANGED,
      () => this.#clearContainer()
    );

    this.bouquetsModel.addObserver(
      EVENTS.SELECTED_COLOR_FILTER_CHANGED,
      () => this.#clearContainer()
    );
    // this.#onDisplayedBouquetsAdded(bouquets);

    this.bouquetsModel.addObserver(EVENTS.DISPLAYED_BOUQUETS_CHANGED, (bouquets) => {
      this.onDisplayedBouquetsChanged(bouquets);
    });
  }
    // );
    #clearContainer() {
      this.#bouquetsContainer.clear();
      // this.#preLoadMoviesMessageView = null;
    }


  #onDisplayedBouquetsAdded(bouquets) {
    console.log('bouquets:', bouquets)
    // if (!movies.length) {
    //   this.#cardsContainer.add(new NoMoviesView(this.moviesModel.selectedFilter));
    // }
    bouquets.forEach((bouquet) => this.#renderBouquetCards(bouquet));
  }

  onDisplayedBouquetsChanged(bouquets) {
    this.#clearContainer();
    this.#onDisplayedBouquetsAdded(bouquets);
  }

  #renderBouquetCards(bouquet) {
    const onClick = async (bouquet) => {
      modals.open("popup-data-attr");
      this.#popupPresenter.renderPopup({ bouquet });
    };
    // const onWatchinglistButtonClick = (movieId) => {
    //   this.#uiBlocker.block();
    //   this.moviesModel.switcIncludingToWatchList(movieId).catch((err) => this.#handleError(movieId, err));
    // };
    // const onAlreadyWatchedlistButtonClick = (movieId) => {
    //   this.#uiBlocker.block();
    //   this.moviesModel.switcIncludingToAlreadyWatchedList(movieId).catch((err) => this.#handleError(movieId, err));
    // };
    // const onFavoriteListButtonClick = (movieId) => {
    //   this.#uiBlocker.block();
    //   this.moviesModel.switcIncludingToFavoriteList(movieId).catch((err) => this.#handleError(movieId, err));
    // };
    // const movieCardView = new MovieCardView(bouquet, { onClick, onWatchinglistButtonClick, onAlreadyWatchedlistButtonClick, onFavoriteListButtonClick});
    const bouquetCardView = new BouquetCardView(bouquet, { onClick } );
    // this.#movieViewMap.set(bouquet.id, movieCardView);
    this.#bouquetsContainer.add(bouquetCardView);
  }

}
