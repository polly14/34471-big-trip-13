import AbstractView from "./abstract.js";


const createPriceTemplate = (point) => {
  let sum = 0;
  for (let i = 0; i < point.length; i++) {
    sum += point[i].pointPrice;
  }
  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
    </p>`;
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
