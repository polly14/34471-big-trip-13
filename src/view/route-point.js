import {createElement} from "../utils/render.js";
import {dateHumanize, getDuration} from "../utils/point.js";

const createPointOffersTemplate = (item) => {

  const offerTitle = item.title;
  const offerPrice = item.price;

  return `<li class="event__offer">
    <span class="event__offer-title">${offerTitle}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
  </li>`;
};

const createRoutePointTemplate = (point) => {

  const {offersList, pointType, destination, pointPrice, pointStartTime, pointEndTime, isFavorite} = point;

  const favorite = isFavorite ? `event__favorite-btn--active` : ``;

  const offersTemplate = () => {
    const offersCheckedList = offersList.filter((item) => item.isOfferChecked === 1)
      .splice(0, 3)
      .map((item, index) => createPointOffersTemplate(item, index === 0))
      .join(``);
    return offersCheckedList;
  };

  let pretext = ``;
  const typePretext = () => {
    if (pointType === `Check-in` || pointType === `Sightseeing` || pointType === `Restaurant`) {
      pretext = `in`;
    } else {
      pretext = `to`;
    }
    return pretext;
  };

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateHumanize(pointStartTime, `YYYY/MM/DD`)}">${dateHumanize(pointStartTime, ` MMM D`)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${pointType} ${typePretext()} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateHumanize(pointStartTime, `YYYY/MM/DD HH:mm`)}">${dateHumanize(pointStartTime, `HH:mm`)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateHumanize(pointEndTime, `YYYY/MM/DD HH:mm`)}">${dateHumanize(pointEndTime, `HH:mm`)}</time>
                  </p>
                  <p class="event__duration">${getDuration(pointStartTime, pointEndTime)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${pointPrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersTemplate()}
                </ul>
                <button class="event__favorite-btn ${favorite}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class RoutePoint {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createRoutePointTemplate(this._point);
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
