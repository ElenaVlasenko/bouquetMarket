import BouquetsApi from '../api/bouquets-api.js';
import CartApi from '../api/cart-api.js';
import Publisher from '../framework/publisher.js';
import { REASON_FILTERS, BOUQUETS_TYPE, BOUQUETS_COLOR_FILTER, BOUQUETS_COLOR, SORTING_ORDER } from '../const.js';

const EVENTS = {
  DISPLAYED_BOUQUETS_ADDED: 'displayed_bouquets_added',
  ALL_BOUQUETS_DISPLAYED: 'all_bouquets_displayed',
  DISPLAYED_BOUQUETS_CHANGED: 'displayed_bouquets_changed',
  CART_UPDATED: 'cart_updated',
  SELECTED_REASON_FILTER_CHANGED: 'selected_reason_filter_changed',
  SELECTED_COLOR_FILTER_CHANGED: 'selected_color_filter_changed',
  BOUQUETS_PART_DISPLAYED: 'bouquets_part_displayed',
  SORTING_ORDER_CHANGED: 'sorting_order_changed',
};

export default class BouquetsModel extends Publisher {

  #bouquetsApi = new BouquetsApi();
  #cartApi = new CartApi();

  #bouquets = null;

  #cart = {
    productCount: 0,
    products: [],
    sum: 0
  };

  #defaultDisplayedBouquetsCount;
  #displayBouquetsCount;
  #selectedReasonFilter = REASON_FILTERS.FOR_ALL;
  #selectedColorFilter = BOUQUETS_COLOR_FILTER.COLOR_ALL;
  #sortingOrder = SORTING_ORDER.ASC;

  #bouquetMap = new Map();

  constructor({ displayBouquetsCount }) {
    super();
    this.#displayBouquetsCount = 0;
    this.#defaultDisplayedBouquetsCount = displayBouquetsCount;
  }

  async init() {
    this.#bouquets = await this.#bouquetsApi.getList();
    this.#cart = await this.#cartApi.get();
    this._notify(EVENTS.CART_UPDATED, this.#cart);
    this.addDisplayedBouquets();
  }

  getBouquets(ids) {
    return this.#bouquets.filter((bouquet) => ids.includes(bouquet.id));
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

    await Promise.all(addingBouquets.map(({id}) => this.loadBouquet(id)));
  }

  async addToCart(id) {
    await this.#cartApi.add(id);
    this.#cart = await this.#cartApi.get();
    this._notify(EVENTS.CART_UPDATED, this.#cart);
  }

  async deleteFromCart() {
    const ids = [...Object.entries(this.cart.products)].flatMap(([id, count]) => this.#multiplyIds(id, count));
    await Promise.all(ids.map((id) => this.#cartApi.delete(id)));
    this.#cart = await this.#cartApi.get();
    this._notify(EVENTS.CART_UPDATED, this.#cart);
  }

  getRemovedFromCartIds() {
    this.cart.products
  }

  #multiplyIds(id, count) {
    const arr = [];
    arr.length = count;
    return Array.from(arr, () => id);
  }

  async getBouquet(id) {
    if(!this.#bouquetMap.has(id)) {
      await this.loadBouquet(id);
    }

    return this.#bouquetMap.get(id);
  }

  async loadBouquet(id) {
    const bouquet = await this.#bouquetsApi.get(id);
    this.#bouquetMap.set(id, bouquet);
  }
  get cart() {
    return this.#cart;
  }

  get filtredBouquets() {
    return this.filtredBouquetsByColor;
  }

  get sortedBouquets() {
    const sorter = this.sortingOrder === SORTING_ORDER.ASC
      ? (bouquet1, bouquet2) => bouquet1.price - bouquet2.price
      : (bouquet1, bouquet2) => bouquet2.price - bouquet1.price;

    return [...this.filtredBouquets].sort(sorter);
  }

  get filtredBouquetsByReason() {
    if (this.#selectedReasonFilter === REASON_FILTERS.FOR_ALL) {
      return this.#bouquets;
    }

    if (this.#selectedReasonFilter === REASON_FILTERS.FOR_BIRTHDAY) {
      return this.#bouquets.filter((bouquet) => bouquet.type === BOUQUETS_TYPE.BIRTHDAYBOY);
    }

    if (this.#selectedReasonFilter === REASON_FILTERS.FOR_BRIDE) {
      return this.#bouquets.filter((bouquet) => bouquet.type === BOUQUETS_TYPE.BRIDE);
    }

    if (this.#selectedReasonFilter === REASON_FILTERS.FOR_COLLEAGUE) {
      return this.#bouquets.filter((bouquet) => bouquet.type === BOUQUETS_TYPE.COLLEAGUES);
    }

    if (this.#selectedReasonFilter === REASON_FILTERS.FOR_DARLING) {
      return this.#bouquets.filter((bouquet) => bouquet.type === BOUQUETS_TYPE.FORLOVE);
    }

    if (this.#selectedReasonFilter === REASON_FILTERS.FOR_MOTHER) {
      return this.#bouquets.filter((bouquet) => bouquet.type === BOUQUETS_TYPE.MOTHERDAY);
    }
  }

  get filtredBouquetsByColor() {
    if (this.#selectedColorFilter === BOUQUETS_COLOR_FILTER.COLOR_ALL) {
      return this.filtredBouquetsByReason;
    }

    if (this.#selectedColorFilter === BOUQUETS_COLOR_FILTER.COLOR_RED) {
      return this.filtredBouquetsByReason.filter((bouquet) => bouquet.color === BOUQUETS_COLOR.RED);
    }

    if (this.#selectedColorFilter === BOUQUETS_COLOR_FILTER.COLOR_LILAC) {
      return this.filtredBouquetsByReason.filter((bouquet) => bouquet.color === BOUQUETS_COLOR.VIOLET);
    }

    if (this.#selectedColorFilter === BOUQUETS_COLOR_FILTER.COLOR_PINK) {
      return this.filtredBouquetsByReason.filter((bouquet) => bouquet.color === BOUQUETS_COLOR.PINK);
    }

    if (this.#selectedColorFilter === BOUQUETS_COLOR_FILTER.COLOR_WHITE) {
      return this.filtredBouquetsByReason.filter((bouquet) => bouquet.color === BOUQUETS_COLOR.WHITE);
    }

    if (this.#selectedColorFilter === BOUQUETS_COLOR_FILTER.COLOR_YELLOW) {
      return this.filtredBouquetsByReason.filter((bouquet) => bouquet.color === BOUQUETS_COLOR.YELLOW);
    }
  }

  setReasonFilter(filterType) {
    this.#selectedReasonFilter = filterType;
    this.#displayBouquetsCount = 0;
    this._notify(EVENTS.SELECTED_REASON_FILTER_CHANGED, this.#selectedReasonFilter);
    this.addDisplayedBouquets();
  }

  setColorFilter(filterType) {
    this.#selectedColorFilter = filterType;
    this.#displayBouquetsCount = 0;
    this._notify(EVENTS.SELECTED_COLOR_FILTER_CHANGED, this.#selectedColorFilter);
    this.addDisplayedBouquets();
  }

  setSortingOrder(sortingOrder) {
    if (sortingOrder === this.#sortingOrder) {
      return;
    }

    this.#sortingOrder = sortingOrder;
    this._notify(EVENTS.DISPLAYED_BOUQUETS_CHANGED, this.sortedBouquets.slice(0, this.#displayBouquetsCount));
    this._notify(EVENTS.SORTING_ORDER_CHANGED, this.#sortingOrder);
  }

  get sortingOrder() {
    return this.#sortingOrder;
  }

  get selectedReasonFilter() {
    return this.#selectedReasonFilter;
  }

  get selectedColorFilter() {
    return this.#selectedColorFilter;
  }
}

export {
  EVENTS,
};
