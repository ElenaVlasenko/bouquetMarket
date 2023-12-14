import BouquetsApi from '../api/bouquets-api.js';
import Publisher from '../framework/publisher.js';

const EVENTS = {
  DISPLAYED_BOUQUETS_ADDED: 'displayed_bouquets_added',
  ALL_BOUQUETS_DISPLAYED: 'all_bouquets_displayed',
  // DISPLAYED_BOUQUETS_CHANGED: 'displayed_bouquets_changed',
  // FILTRED_MOVIES_CHANGED: 'filtred_movies_changed',
  // MOVIE_UPDATED: 'movie_updated',
  // SELECTED_FILTER_CHANGED: 'selected_filter_changed',
  BOUQUETS_PART_DISPLAYED: 'bouquets_part_displayed',
  // SORTING_ORDER_CHANGED: 'sorting_order_changed',
  // MODEL_INITIALIZED: 'model_initialized',
  // MOVIE_COMMENT_ADDED: 'movie_comment_added',
  // MOVIE_COMMENT_DELETED: 'movie_comment_deleted',
  // MOVIES_LOADED: 'movies_loaded',
  // DATA_LOADING_ERROR: 'data_loading_error'
};

export default class BouquetsModel extends Publisher {
  #bouquetsApi = new BouquetsApi();
  #bouquets;
  #defaultDisplayedBouquetsCount;
  #displayBouquetsCount;

  constructor({ displayBouquetsCount }) {
    super();
    this.#displayBouquetsCount = 0;
    this.#defaultDisplayedBouquetsCount = displayBouquetsCount;
  }

  async init() {
    const bouquets = await this.#bouquetsApi.getList();
    this.#bouquets = bouquets;
    this.addDisplayedBouquets();
    console.log('bouquets:', bouquets)
  }

  async addDisplayedBouquets() {
    const newDisplayedBouquetsCount = Math.min(this.#displayBouquetsCount + this.#defaultDisplayedBouquetsCount, this.sortedBouquets.length);

    if (this.#displayBouquetsCount === newDisplayedBouquetsCount && this.#displayBouquetsCount !== 0) {
      this._notify(EVENTS.ALL_BOUQUETS_DISPLAYED);
      return;
    }

    const addingBouquets = this.sortedBouquets.slice(this.#displayBouquetsCount, newDisplayedBouquetsCount);
    this.#displayBouquetsCount = newDisplayedBouquetsCount;

    if (this.#displayBouquetsCount === this.sortedBouquets.length) {
      this._notify(EVENTS.ALL_BOUQUETS_DISPLAYED);
    } else {
      this._notify(EVENTS.BOUQUETS_PART_DISPLAYED);
    }

    this._notify(EVENTS.DISPLAYED_BOUQUETS_ADDED, addingBouquets);

    // await Promise.all(addingMovies.map(({id}) => this.loadComments(id)));
  }

  get filtredBouquets() {
    return this.#bouquets;
  }

  get sortedBouquets() {
    return this.filtredBouquets;
  }
}

export {
  EVENTS,
};
