import { RenderPosition } from "../framework/render.js";
import HeroView from "../view/hero-view.js";
import MissionView from "../view/mission-view.js";
import AdvantagesView from "../view/advantages-view.js";

export default class BoardPresenter {

  #heroView = null;
  #mainContainer = null;
  #missionView = null;
  #missionContainer = null;
  #advantagesContainer = null;
  #advantagesView = null;


  constructor({ mainContainer, missionContainer, advantagesContainer }) {
    this.#mainContainer = mainContainer;
    this.#missionContainer = missionContainer;
    this.#advantagesContainer = advantagesContainer;
  }

  init() {
    this.#renderHero();
    this.#renderMission();
    this.#renderAdvantages();
  }

  #renderHero() {
    this.#heroView = new HeroView();
    this.#mainContainer.add(this.#heroView, RenderPosition.AFTERBEGIN);
  }

  #renderMission() {
    this.#missionView = new MissionView();
    this.#missionContainer.add(this.#missionView);
  }

  #renderAdvantages() {
    this.#advantagesView = new AdvantagesView();
    this.#advantagesContainer.add(this.#advantagesView);
  }
}
