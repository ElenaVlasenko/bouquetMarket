import './vendor';
import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modals/init-modals';
import BouquetsModel from './models/bouquets-model.js';
import BouquetCardsPresenter from './presenters/bouquet-cards-presenter.js';
import ContainerView from './framework/view/container-view.js';
import BoardPresenter from './presenters/board-presenter.js';
import ShowMoreButtonPresenter from './presenters/show-more-button-presenter.js';
import { DISPLAYED_BOUQUETS_COUNT } from './const.js';
import PopupPresenter from './presenters/popup-presenter.js';
import PopupDeferredPresenter from './presenters/popup-deferred-presenter.js';
import FilterReasonPresenter from './presenters/filter-reason-presenter.js';
import FilterColorPresenter from './presenters/filter-color-presenter.js';
import SortPresenter from './presenters/sort-presenter.js';
import HeaderPresenter from './presenters/header-presenter.js';

window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();

  window.addEventListener('load', () => {
    initModals();
  });

  const headerElement = document.querySelector('header');
  const headerContainer = new ContainerView(headerElement);

  const mainElement = document.querySelector('main');
  const mainContainer = new ContainerView(mainElement);

  const bouquetListElement = document.querySelector('.catalogue__list');
  const bouquetListContainer = new ContainerView(bouquetListElement);

  const popupElement = document.querySelector('.modal-product');
  const popupContainer = new ContainerView(popupElement);

  const missionElement = document.querySelector('.mission');
  const missionContainer = new ContainerView(missionElement);

  const advantagesElement = document.querySelector('.advantages');
  const advantagesContainer = new ContainerView(advantagesElement);

  const filterReasonElement = document.querySelector('.filter-reason');
  const filterReasonContainer = new ContainerView(filterReasonElement);

  const filterColorElement = document.querySelector('.filter-color');
  const filterColorContainer = new ContainerView(filterColorElement);

  const sortElement = document.querySelector('.catalogue__sorting');
  const sortContainer = new ContainerView(sortElement);

  const bouquetsModel = new BouquetsModel({ displayBouquetsCount: DISPLAYED_BOUQUETS_COUNT });

  const boardPresenter = new BoardPresenter({
    mainContainer,
    missionContainer,
    advantagesContainer
  })

  const showMoreButtonPresenter = new ShowMoreButtonPresenter({
    bouquetListContainer,
    bouquetsModel
  });

  const popupPresenter = new PopupPresenter({
    popupContainer,
    bouquetsModel
  });

  const popupDeferredPresenter = new PopupDeferredPresenter({
    popupContainer,
    bouquetsModel
  });

  const bouquetsCardsPresenter = new BouquetCardsPresenter({
    bouquetListContainer,
    bouquetsModel,
    popupPresenter
  });

  const filterReasonPresenter = new FilterReasonPresenter({
    bouquetsModel,
    filterReasonContainer
  });

  const filterColorPresenter = new FilterColorPresenter({
    bouquetsModel,
    filterColorContainer
  });

  const sortPresenter = new SortPresenter({
    bouquetsModel,
    sortContainer
  });

  const headerPresenter = new HeaderPresenter({
    headerContainer,
    bouquetsModel,
    popupDeferredPresenter
  });

  headerPresenter.init();
  popupDeferredPresenter.init();
  bouquetsModel.init();
  bouquetsCardsPresenter.init();
  boardPresenter.init();
  showMoreButtonPresenter.init();
  filterReasonPresenter.init();
  filterColorPresenter.init();
  sortPresenter.init();
});
