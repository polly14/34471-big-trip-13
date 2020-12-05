import AbstractView from "./abstract.js";

const createTripEventsMsgTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};


export default class TripEventsMsg extends AbstractView {

  getTemplate() {
    return createTripEventsMsgTemplate();
  }

}

