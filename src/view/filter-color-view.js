import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { BOUQUETS_COLOR_FILTER } from '../const.js';

function createTemplate({ selectedFilter }) {

    return `
    <div class="container">
      <h2 class="title title--h3 filter-color__title">Выберите основной цвет для букета</h2>
      <form class="filter-color__form" action="#" method="post">
        <div class="filter-color__form-fields" data-filter-color="filter">
          <div class="filter-field-img filter-color__form-field">
            <input data-filtertype="${BOUQUETS_COLOR_FILTER.COLOR_ALL}" class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-0" name="colors" value="color-all" ${selectedFilter === BOUQUETS_COLOR_FILTER.COLOR_ALL ? 'checked' : ''} data-filter-color="color-all">
            <label class="filter-field-img__label" for="filter-colors-field-id-0"><span class="filter-field-img__img">
                <picture>
                  <source type="image/webp" srcset="img/content/filter-all.webp, img/content/filter-all@2x.webp 2x"><img src="img/content/filter-all.png" srcset="img/content/filter-all@2x.png 2x" width="130" height="130" alt="все цвета">
                </picture></span><span class="filter-field-img__text">все цвета</span></label>
          </div>
          <div class="filter-field-img filter-color__form-field">
            <input data-filtertype="${BOUQUETS_COLOR_FILTER.COLOR_RED}" class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-1" name="colors" value="color-red" ${selectedFilter === BOUQUETS_COLOR_FILTER.COLOR_RED ? 'checked' : ''} data-filter-color="color-red">
            <label class="filter-field-img__label" for="filter-colors-field-id-1"><span class="filter-field-img__img">
                <picture>
                  <source type="image/webp" srcset="img/content/filter-red.webp, img/content/filter-red@2x.webp 2x"><img src="img/content/filter-red.png" srcset="img/content/filter-red@2x.png 2x" width="130" height="130" alt="красный">
                </picture></span><span class="filter-field-img__text">красный</span></label>
          </div>
          <div class="filter-field-img filter-color__form-field">
            <input data-filtertype="${BOUQUETS_COLOR_FILTER.COLOR_WHITE}" class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-2" name="colors" value="color-white" ${selectedFilter === BOUQUETS_COLOR_FILTER.COLOR_WHITE ? 'checked' : ''} data-filter-color="color-white">
            <label class="filter-field-img__label" for="filter-colors-field-id-2"><span class="filter-field-img__img">
                <picture>
                  <source type="image/webp" srcset="img/content/filter-white.webp, img/content/filter-white@2x.webp 2x"><img src="img/content/filter-white.png" srcset="img/content/filter-white@2x.png 2x" width="130" height="130" alt="белый">
                </picture></span><span class="filter-field-img__text">белый</span></label>
          </div>
          <div class="filter-field-img filter-color__form-field">
            <input data-filtertype="${BOUQUETS_COLOR_FILTER.COLOR_LILAC}" class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-3" name="colors" value="color-lilac" ${selectedFilter === BOUQUETS_COLOR_FILTER.COLOR_LILAC ? 'checked' : ''} data-filter-color="color-lilac">
            <label class="filter-field-img__label" for="filter-colors-field-id-3"><span class="filter-field-img__img">
                <picture>
                  <source type="image/webp" srcset="img/content/filter-lilac.webp, img/content/filter-lilac@2x.webp 2x"><img src="img/content/filter-lilac.png" srcset="img/content/filter-lilac@2x.png 2x" width="130" height="130" alt="сиреневый">
                </picture></span><span class="filter-field-img__text">сиреневый</span></label>
          </div>
          <div class="filter-field-img filter-color__form-field">
            <input data-filtertype="${BOUQUETS_COLOR_FILTER.COLOR_YELLOW}" class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-4" name="colors" value="color-yellow" ${selectedFilter === BOUQUETS_COLOR_FILTER.COLOR_YELLOW ? 'checked' : ''} data-filter-color="color-yellow">
            <label class="filter-field-img__label" for="filter-colors-field-id-4"><span class="filter-field-img__img">
                <picture>
                  <source type="image/webp" srcset="img/content/filter-yellow.webp, img/content/filter-yellow@2x.webp 2x"><img src="img/content/filter-yellow.png" srcset="img/content/filter-yellow@2x.png 2x" width="130" height="130" alt="жёлтый">
                </picture></span><span class="filter-field-img__text">жёлтый</span></label>
          </div>
          <div class="filter-field-img filter-color__form-field">
            <input data-filtertype="${BOUQUETS_COLOR_FILTER.COLOR_PINK}" class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-5" name="colors" value="color-pink" ${selectedFilter === BOUQUETS_COLOR_FILTER.COLOR_PINK ? 'checked' : ''} data-filter-color="color-pink">
            <label class="filter-field-img__label" for="filter-colors-field-id-5"><span class="filter-field-img__img">
                <picture>
                  <source type="image/webp" srcset="img/content/filter-pink.webp, img/content/filter-pink@2x.webp 2x"><img src="img/content/filter-pink.png" srcset="img/content/filter-pink@2x.png 2x" width="130" height="130" alt="розовый">
                </picture></span><span class="filter-field-img__text">розовый</span></label>
          </div>
        </div>
        <button class="visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
      </form>
    </div>
   `;
}

export default class FilterColorView extends AbstractStatefulView {

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
