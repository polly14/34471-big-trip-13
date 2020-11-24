let sum = 0;

export const createPriceTemplate = (point) => {

  for (let i = 0; i < point.length; i++) {
    sum += point[i].pointPrice;
  }
  return `<section class="trip-main__trip-info  trip-info">
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
    </p>
  </section>`;
};
