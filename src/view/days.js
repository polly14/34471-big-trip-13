import {createElement} from "../utils/render.js";

const createDaysTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};


export default class Days {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
