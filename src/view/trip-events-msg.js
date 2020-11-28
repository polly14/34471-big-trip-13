import {createElement} from "../utils/render.js";

const createTripEventsMsgTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};


export default class TripEventsMsg {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsMsgTemplate();
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

