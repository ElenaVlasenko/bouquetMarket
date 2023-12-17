import BouquetCardView from '../view/bouquet-card-view';
import { EVENTS } from '../models/bouquets-model.js';
import { modals, initModals } from '../modals/init-modals';

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

    this.bouquetsModel.addObserver(EVENTS.DISPLAYED_BOUQUETS_ADDED, (bouquets) => this.#onDisplayedBouquetsAdded(bouquets));

    this.bouquetsModel.addObserver(
      EVENTS.SELECTED_REASON_FILTER_CHANGED,
      () => this.#clearContainer()
    );

    this.bouquetsModel.addObserver(
      EVENTS.SELECTED_COLOR_FILTER_CHANGED,
      () => this.#clearContainer()
    );

    this.bouquetsModel.addObserver(EVENTS.DISPLAYED_BOUQUETS_CHANGED, (bouquets) => {
      this.onDisplayedBouquetsChanged(bouquets);
    });
  }

  #clearContainer() {
    this.#bouquetsContainer.clear();
  }

  #onDisplayedBouquetsAdded(bouquets) {
    bouquets.forEach((bouquet) => this.#renderBouquetCards(bouquet));
  }

  onDisplayedBouquetsChanged(bouquets) {
    this.#clearContainer();
    this.#onDisplayedBouquetsAdded(bouquets);
  }

  #renderBouquetCards(bouquet) {
    const onClick = async (bouquet) => {
      modals.open('popup-data-attr');
      const fullBouquetData = await this.bouquetsModel.getBouquet(bouquet.id);
      this.#popupPresenter.renderPopup({ bouquet: fullBouquetData });
    };
    const bouquetCardView = new BouquetCardView(bouquet, { onClick } );
    this.#bouquetsContainer.add(bouquetCardView);
  }

}
