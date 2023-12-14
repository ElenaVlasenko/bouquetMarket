import BouquetCardView from "../view/bouquet-card-view";
import { EVENTS } from "../models/bouquets-model.js";

export default class BouquetCardsPresenter {
  #bouquetsContainer = null;
  bouquetsModel = null;

  constructor({ bouquetListContainer, bouquetsModel }) {
    this.#bouquetsContainer = bouquetListContainer;
    this.bouquetsModel = bouquetsModel;
  }

  init() {
    // this.#preLoadMoviesMessageView = new PreLoadMoviesMessageView('Loading...');
    // this.#cardsContainer.add(this.#preLoadMoviesMessageView);

    this.bouquetsModel.addObserver(EVENTS.DISPLAYED_BOUQUETS_ADDED, (bouquets) => this.#onDisplayedBouquetsAdded(bouquets));
    // this.#onDisplayedBouquetsAdded(bouquets);

    // this.moviesModel.addObserver(EVENTS.DISPLAYED_MOVIES_CHANGED, (displayedMovies) => {
    //   this.onDisplayedMoviesChanged(displayedMovies);
    }
    // );



  #onDisplayedBouquetsAdded(bouquets) {
    // if (!movies.length) {
    //   this.#cardsContainer.add(new NoMoviesView(this.moviesModel.selectedFilter));
    // }
    bouquets.forEach((bouquet) => this.#renderBouquetCards(bouquet));
  }

  #renderBouquetCards(bouquet) {
    // const onClick = async (theMovie) => {
    //   const comments = await this.moviesModel.getComments(theMovie.id);
    //   this.#popupPresenter.renderPopup({ movie: theMovie, comments });
    // };
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
    const bouquetCardView = new BouquetCardView(bouquet);
    // this.#movieViewMap.set(bouquet.id, movieCardView);
    this.#bouquetsContainer.add(bouquetCardView);
  }

}
