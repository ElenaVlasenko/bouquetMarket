import { RenderPosition } from "../framework/render.js";
import HeroView from "../view/hero-view.js";

export default class BoardPresenter {

  #heroView = null;
  #mainContainer = null;


  constructor({ mainContainer }) {
    this.#mainContainer = mainContainer;
  }

  init() {
    this.#renderHero();
  }

  #renderHero() {
    this.#heroView = new HeroView();
    this.#mainContainer.add(this.#heroView, RenderPosition.AFTERBEGIN);
  }
}
