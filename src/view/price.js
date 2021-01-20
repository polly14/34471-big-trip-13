import AbstractView from "./abstract.js";


const createPriceTemplate = (point) => {
  let sum = 0;
  const getSum = () => {
    for (let i = 0; i < point.length; i++) {
      sum += point[i].pointPrice;
      for (let p = 0; p < point[i].pointOffersList.length; p++) {
        sum += point[i].pointOffersList[p].price;
      }
    }
    return sum;
  };
  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getSum()}</span>
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
