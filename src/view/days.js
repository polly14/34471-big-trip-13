import AbstractView from "./abstract.js";

const createDaysTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};


export default class Days extends AbstractView {


  getTemplate() {
    return createDaysTemplate();
  }


}
