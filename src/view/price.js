import AbstractView from "./abstract.js";
let sum = 0;

const createPriceTemplate = (point) => {

  for (let i = 0; i < point.length; i++) {
    sum += point[i].pointPrice;
  }
  return `<section class="trip-main__trip-info  trip-info">
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
    </p>
  </section>`;
};

export default class Price extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createPriceTemplate(this._points);
  }

}
