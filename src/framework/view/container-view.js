import { RenderPosition, render } from '../render.js';
// import UiBlocker from '../ui-blocker/ui-blocker.js';

export default class ContainerView {
  #element = null;
  // #containerBlocker = new UiBlocker();

  constructor(element) {
    this.#element = element;
  }

  add(view, place = RenderPosition.BEFOREEND) {
    render(view, this.#element, place);
  }

  clear() {
    this.#element.innerHTML = '';
  }

  block() {
    // this.#containerBlocker.block(this.#element);
  }

  unblock() {
    // this.#containerBlocker.unblock();
  }
}
