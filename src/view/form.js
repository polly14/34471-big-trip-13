import {getCurrentDate, dateHumanize} from "../utils/point.js";
import {TYPES, TYPEGROUPS, DESTINATIONS} from "../const.js";
import {counter} from "../utils/common.js";
import {generateDescription} from "../mock/route-point.js";


const createItemTypes = (item) => {
  return `<div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
  </div>`;
};

const createDestinationsList = (item) => {
  return `<option value="${item.name}">${item.name}</option>`;
};

const createPhotos = (item) => {
  const photoSrc = item.src;
  return `<img class="event__photo" src="${photoSrc}${Math.random()}" alt="Event photo">`;
};

const createItemFormDetails = (item) => {
  const offerTitle = item.title;
  const offerPrice = item.price;
  const offerCounter = counter();
  const offerChecked = item.isOfferChecked;
  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offerCounter}" type="checkbox" name="event-offer-luggage" ${offerChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-luggage-${offerCounter}">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
    </label>
  </div>`;
};

export const createFormTemplate = (point = {}) => {

  const {
    offersList = null,
    pointType = TYPES[0],
    destination = ``,
    pointPrice = ``,
    pointStartTime = getCurrentDate(),
    pointEndTime = getCurrentDate(),
    photos = ``,
  } = point;

  const typeItemsTemplate = (g) => {
    const typeItems = TYPES.filter((item) => TYPEGROUPS[TYPES.indexOf(item)].group === g)
      .map((item, index) => createItemTypes(item, index === 0))
      .join(``);
    return typeItems;
  };

  const destListTemplate = () => {
    const typeItems = DESTINATIONS
      .map((item, index) => createDestinationsList(item, index === 0))
      .join(``);
    return typeItems;
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

  const detailItemsTemplate = `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersList && offersList
        .map((item, index) => createItemFormDetails(item, index === 0))
        .join(``)}
     </div>
  </section>`;

  const pointPhotos = photos || [];
  const photoTemplate = pointPhotos
    .map((item, index) => createPhotos(item, index === 0))
    .join(``);

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Transfer</legend>
                        ${typeItemsTemplate(`Transfer`)}
                      </fieldset>
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Activity</legend>
                        ${typeItemsTemplate(`Activity`)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${pointType} ${typePretext()}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destListTemplate()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateHumanize(pointStartTime, `DD/MM/YY HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateHumanize(pointEndTime, `DD/MM/YY HH:mm`)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${pointPrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  ${detailItemsTemplate}
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${generateDescription(destination)}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photoTemplate}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
};
