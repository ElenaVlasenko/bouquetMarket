// Импорт вендоров и утилит, не удаляйте его
import "./vendor";
import { ImageSlider } from "./utils/image-slider";
import { iosVhFix } from "./utils/ios-vh-fix";
import { modals, initModals } from "./modals/init-modals";
import BouquetsModel from "./models/bouquets-model.js";
import BouquetCardsPresenter from "./presenters/bouquet-cards-presenter.js";
import ContainerView from "./framework/view/container-view.js";
import BoardPresenter from "./presenters/board-presenter.js";
import ShowMoreButtonPresenter from "./presenters/show-more-button-presenter.js";
import { DISPLAYED_BOUQUETS_COUNT } from "./const.js";

// Ваши импорты...

// Код для работы попапов, не удаляйте его
window.addEventListener("DOMContentLoaded", () => {
  iosVhFix();

  window.addEventListener("load", () => {
    // Инициализация слайдера
    const imageSlider = new ImageSlider(".image-slider");
    imageSlider.init();

    // Инициализация попапов
    initModals();
  });

  // Пример кода для открытия попапа
  document
    .querySelector(".element-which-is-open-popup")
    .addEventListener("click", () => modals.open("popup-data-attr"));

  // Код отработает, если разметка попапа уже отрисована в index.html

  // Если вы хотите рисовать разметку попапа под каждое "открытие",
  // то не забудьте перенесети в код addEventListener инициализацию слайдера

  // ------------

  // Ваш код...

  const mainElement = document.querySelector('main');
  const mainContainer = new ContainerView(mainElement);
  const bouquetListElement = document.querySelector('.catalogue__list');
  const bouquetListContainer = new ContainerView(bouquetListElement);

  const bouquetsModel = new BouquetsModel({ displayBouquetsCount: DISPLAYED_BOUQUETS_COUNT });

  const bouquetsCardsPresenter = new BouquetCardsPresenter({
    bouquetListContainer,
    bouquetsModel
  });

  const boardPresenter = new BoardPresenter({
    mainContainer
  })

  const showMoreButtonPresenter = new ShowMoreButtonPresenter({
    bouquetListContainer,
    bouquetsModel
  });


  bouquetsModel.init();
  bouquetsCardsPresenter.init();
  boardPresenter.init();
  showMoreButtonPresenter.init();
});
