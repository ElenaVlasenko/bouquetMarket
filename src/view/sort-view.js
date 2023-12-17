import AbstractStatefulView from "../framework/view/abstract-stateful-view.js";
import { SORTING_ORDER } from "../const.js";

function createTemplate({ sortingOrder }) {
console.log('sortingOrder:', sortingOrder)

  return `
  <div class="sorting-price">
    <h3 class="title sorting-price__title">Цена</h3><a data-sorting="${SORTING_ORDER.ASC}" class="sorting-price__link sorting-price__link--incr ${SORTING_ORDER.ASC === sortingOrder ? ' sorting-price__link--active' : ''}" href="#" aria-label="сортировка по возрастанию цены">
      <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
        <use xlink:href="#icon-increase-sort"></use>
      </svg></a><a data-sorting="${SORTING_ORDER.DESC}" class="sorting-price__link ${SORTING_ORDER.DESC === sortingOrder ? ' sorting-price__link--active' : ''}" href="#" aria-label="сортировка по убыванию цены">
      <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
        <use xlink:href="#icon-descending-sort"></use>
      </svg></a>
  </div>
   `;
}

export default class SortView extends AbstractStatefulView {

  #handleSortClick = null;

  constructor(params, { onClick }) {
    super();
    this._setState(params);
    this.#handleSortClick = onClick;
    this._restoreHandlers();
  }

  get template() {
    return createTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      const target = evt.target['href']?.baseVal ? evt.target : evt.target.querySelector('use');
      if (target['href'].baseVal) {
        const selectedSorting = target['href'].baseVal === '#icon-increase-sort' ? SORTING_ORDER.ASC : SORTING_ORDER.DESC;
        this._setState({ selectedSorting });
        this.#handleSortClick(selectedSorting);
      }
    });
  }
}
