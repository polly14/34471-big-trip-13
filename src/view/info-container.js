import AbstractView from "./abstract.js";

const createInfoContainerTemplate = () => {

  return `<section class="trip-main__trip-info  trip-info">
  </section>`;
};

export default class InfoContainer extends AbstractView {

  getTemplate() {
    return createInfoContainerTemplate();
  }

}
