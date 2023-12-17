import AbstractStatefulView from "../framework/view/abstract-stateful-view.js";
import { REASON_FILTERS } from "../const.js";

function createTemplate({ selectedFilter }) {
    return `
    <div class="container">
    <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
    <form class="filter-reason__form" action="#" method="post">
      <div class="filter-reason__form-fields">
        <div class="filter-field-text filter-reason__form-field--for-all filter-reason__form-field">
          <input data-filtertype="${REASON_FILTERS.FOR_ALL}" class="filter-field-text__input filter-reason__form-field--for-all filter-reason__form-field" type="radio" id="filter-reason-field-id-0" name="reason" value="for-all" ${selectedFilter === REASON_FILTERS.FOR_ALL ? 'checked' : ''}>
          <label class="filter-field-text__label" for="filter-reason-field-id-0"><span class="filter-field-text__text">Для всех</span></label>
        </div>
        <div class="filter-field-text filter-reason__form-field--for-birthday filter-reason__form-field">
          <input data-filtertype="${REASON_FILTERS.FOR_BIRTHDAY}" class="filter-field-text__input filter-reason__form-field--for-birthday filter-reason__form-field" type="radio" id="filter-reason-field-id-1" name="reason" value="for-birthday" ${selectedFilter === REASON_FILTERS.FOR_BIRTHDAY ? 'checked' : ''}>
          <label class="filter-field-text__label" for="filter-reason-field-id-1"><span class="filter-field-text__text">Имениннику</span></label>
        </div>
        <div class="filter-field-text filter-reason__form-field--for-bride filter-reason__form-field">
          <input data-filtertype="${REASON_FILTERS.FOR_BRIDE}" class="filter-field-text__input filter-reason__form-field--for-bride filter-reason__form-field" type="radio" id="filter-reason-field-id-2" name="reason" value="for-bride" ${selectedFilter === REASON_FILTERS.FOR_BRIDE ? 'checked' : ''}>
          <label class="filter-field-text__label" for="filter-reason-field-id-2"><span class="filter-field-text__text">Невесте</span></label>
        </div>
        <div class="filter-field-text filter-reason__form-field--for-mother filter-reason__form-field">
          <input data-filtertype="${REASON_FILTERS.FOR_MOTHER}" class="filter-field-text__input filter-reason__form-field--for-mother filter-reason__form-field" type="radio" id="filter-reason-field-id-3" name="reason" value="for-mother" ${selectedFilter === REASON_FILTERS.FOR_MOTHER ? 'checked' : ''}>
          <label class="filter-field-text__label" for="filter-reason-field-id-3"><span class="filter-field-text__text">Маме</span></label>
        </div>
        <div class="filter-field-text filter-reason__form-field--for-colleague filter-reason__form-field">
          <input data-filtertype="${REASON_FILTERS.FOR_COLLEAGUE}" class="filter-field-text__input filter-reason__form-field--for-colleague filter-reason__form-field" type="radio" id="filter-reason-field-id-4" name="reason" value="for-colleague" ${selectedFilter === REASON_FILTERS.FOR_COLLEAGUE ? 'checked' : ''}>
          <label class="filter-field-text__label" for="filter-reason-field-id-4"><span class="filter-field-text__text">Коллеге</span></label>
        </div>
        <div class="filter-field-text filter-reason__form-field--for-darling filter-reason__form-field">
          <input data-filtertype="${REASON_FILTERS.FOR_DARLING}" class="filter-field-text__input filter-reason__form-field--for-darling filter-reason__form-field" type="radio" id="filter-reason-field-id-5" name="reason" value="for-darling" ${selectedFilter === REASON_FILTERS.FOR_DARLING ? 'checked' : ''}>
          <label class="filter-field-text__label" for="filter-reason-field-id-5"><span class="filter-field-text__text">Любимой</span></label>
        </div>
      </div>
      <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
    </form>
  </div>
   `;
}

export default class FilterReasonView extends AbstractStatefulView {

  #handleFilterClick = null;

  constructor(params, { onFilterClick }) {
    super();
    this._setState(params);
    this.#handleFilterClick = onFilterClick;
    this._restoreHandlers();
  }

  get template() {
    return createTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', (evt) => {
      if (evt.target.dataset.filtertype) {
        this._setState({ selectedFilter: evt.target.dataset.filtertype });
        this.#handleFilterClick(evt.target.dataset.filtertype);
      }
    });
  }
}
