import SmartView from "./smart.js";
import dayjs from "dayjs";
import {dateHumanize, generateOffer} from "../utils/point.js";
import {TYPES, TYPEGROUPS} from "../const.js";
import {counter} from "../utils/common.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_POINT = {
  pointOffersList: generateOffer(TYPES[0]),
  pointType: TYPES[0],
  nameDestination: ``,
  pointPrice: 0,
  pointStartTime: dayjs(),
  pointEndTime: dayjs(),
  isFavorite: false
};

const createDestinationsList = (item) => {
  return `<option value="${item}">${item}</option>`;
};

const createItemTypes = (item) => {
  return `<div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
  </div>`;
};

const createPhotos = (item) => {
  const photoSrc = item.src;
  return `<img class="event__photo" src="${photoSrc}" alt="Event photo">`;
};

const createItemFormDetails = (isDisabled, item) => {
  const offerTitle = item.title;
  const offerPrice = item.price;
  const offerCounter = counter();
  const offerChecked = item.isChecked;
  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offerCounter}" type="checkbox" name="event-offer-luggage" ${offerChecked ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
    <label class="event__offer-label" for="event-offer-luggage-${offerCounter}">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
    </label>
  </div>`;
};

const createFormTemplate = (data, offersData, destinationsData, isNewPoint) => {
  const {pointType, pointOffersList, nameDestination, picturesDestination, descriptionDestination, pointPrice, pointStartTime, pointEndTime, isStartTimeSelected, isOffers, isEndTimeSelected, isPointPrice, isDisabled, isSaving, isDeleting} = data;

  const destinationList = destinationsData.getAllDestinations();
  const typesList = offersData.getAllTypes();

  const getDestListTemplate = () => {
    const typeItems = destinationList
      .map((item, index) => createDestinationsList(item, index === 0))
      .join(``);
    return typeItems;
  };

  const getTypeItemsTemplate = (g) => {
    const typeItems = typesList.filter((item) => TYPEGROUPS[typesList.indexOf(item)].group === g)
      .map((item, index) => createItemTypes(item, index === 0))
      .join(``);
    return typeItems;
  };

  let pretext = ``;
  const getTypePretext = () => {
    if (pointType === `check-in` || pointType === `sightseeing` || pointType === `restaurant`) {
      pretext = `in`;
    } else {
      pretext = `to`;
    }
    return pretext;
  };

  const detailItemsTemplate = `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersData.getCheckedOffers(pointOffersList, pointType)
        .map((item, index) => createItemFormDetails(isDisabled, item, index === 0))
        .join(``)}
     </div>
  </section>`;

  const getPhotoTemplate = function () {
    if (picturesDestination) {
      const pointPhotos = picturesDestination || [];
      return pointPhotos
        .map((item, index) => createPhotos(item, index === 0))
        .join(``);
    }
    return ``;
  };

  const isSubmitDisabled = (nameDestination === `` || destinationList.indexOf(nameDestination) === -1);

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? `disabled` : ``}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Transfer</legend>
                        ${getTypeItemsTemplate(`Transfer`)}
                      </fieldset>
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Activity</legend>
                        ${getTypeItemsTemplate(`Activity`)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${pointType} ${getTypePretext()}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${nameDestination}" list="destination-list-1" ${isDisabled ? `disabled` : ``}>
                    <datalist id="destination-list-1" >
                      ${getDestListTemplate()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${isStartTimeSelected ? dateHumanize(pointStartTime, `DD/MM/YY HH:mm`) : ``}" ${isDisabled ? `disabled` : ``}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${isEndTimeSelected ? dateHumanize(pointEndTime, `DD/MM/YY HH:mm`) : ``}" ${isDisabled ? `disabled` : ``}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${isPointPrice ? pointPrice : 0}" ${isDisabled ? `disabled` : ``}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? `disabled` : ``} >
                    ${isSaving ? `Saving...` : `Save`}
                  </button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>
                    ${isNewPoint ? `Cancel` : ``} 
                    ${isDeleting && !isNewPoint ? `Deleting` : ``}
                    ${!isDeleting && !isNewPoint ? `Delete` : ``}
                  </button>
                  <button class="event__rollup-btn" type="button" ${isNewPoint ? `style="display: none;"` : ``}>
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${isOffers ? detailItemsTemplate : ``}
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${isSubmitDisabled ? `` : descriptionDestination}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${getPhotoTemplate()}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
};

export default class Form extends SmartView {
  constructor(items = BLANK_POINT, offersModel, destinationsModel, isNewPoint) {

    super();
    this._data = Form.parsePointToData(items);
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._isNewPoint = isNewPoint;
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);
    this._editRollupHandler = this._editRollupHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._pointPriceToggleHandler = this._pointPriceToggleHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._offersToggleHandler = this._offersToggleHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setStartTimeDatepicker();
    this._setEndTimeDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(items) {
    this.updateData(
        Form.parsePointToData(items)
    );
  }

  getTemplate() {
    return createFormTemplate(this._data, this._offersModel, this._destinationsModel, this._isNewPoint);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartTimeDatepicker();
    this._setEndTimeDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditRollupHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setStartTimeDatepicker() {
    if (this._startDatepicker) {

      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._data.pointStartTime) {

      this._startDatepicker = flatpickr(
          this.getElement().querySelector(`#event-start-time-1`),
          {
            dateFormat: `d/m/y H:i`,
            enableTime: true,
            time24hr: true,
            defaultDate: this._data.pointStartTime,
            onChange: this._startTimeChangeHandler
          }
      );
    }
  }
  _setEndTimeDatepicker() {
    if (this._endDatepicker) {

      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    if (this._data.pointEndTime) {

      this._endDatepicker = flatpickr(
          this.getElement().querySelector(`#event-end-time-1`),
          {
            dateFormat: `d/m/y H:i`,
            enableTime: true,
            time24hr: true,
            minDate: this._data.pointStartTime,
            defaultDate: this._data.pointEndTime,
            onChange: this._endTimeChangeHandler
          }
      );
    }
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData({
      pointStartTime: userDate,
    }, false);
    if (userDate > this._data.pointEndTime) {
      this.updateData({
        pointEndTime: userDate,
      }, false);
    }
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({
      pointEndTime: userDate
    }, false);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationToggleHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._pointPriceToggleHandler);
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`click`, this._typeToggleHandler);
    const isOffer = this.getElement().querySelector(`.event__available-offers`);
    if (isOffer) {
      isOffer.addEventListener(`change`, this._offersToggleHandler);
    }
    if (isOffer.childNodes.length === 1) {
      this.getElement().querySelector(`.event__section--offers`).style.display = `none`;
    }
    if (this.getElement().querySelector(`.event__destination-description`).childNodes.length === 0) {
      this.getElement().querySelector(`.event__section--destination`).style.display = `none`;
    }
  }

  _destinationToggleHandler(evt) {
    if (!evt.target.value) {
      evt.preventDefault();
      this.updateData({
        nameDestination: evt.target.value,
        descriptionDestination: ``,
        picturesDestination: []
      }, false);
    } else if (evt.target.value) {
      evt.preventDefault();
      this.updateData({
        nameDestination: evt.target.value,
        descriptionDestination: this._destinationsModel.getDestinations(evt.target.value).description,
        picturesDestination: this._destinationsModel.getDestinations(evt.target.value).pictures

      }, false);
    }
  }

  _typeToggleHandler(evt) {
    if (evt.target.value) {
      evt.preventDefault();
      this.updateData({
        pointType: evt.target.value,
        pointOffersList: []
      }, false);
    }
  }

  _offersToggleHandler(evt) {
    const offersList = this._offersModel.getOffers(this._data.pointType);
    const offers = this.getElement().querySelectorAll(`.event__available-offers input`);
    const getOffersCheckedList = () => {
      const l = [];
      for (let g = 0; g < offers.length; g++) {
        if (offers[g].checked) {
          l.push(offersList[g]);
        }
      }
      return l;
    };
    if (evt.target.tagName !== `INPUT`) {
      return;
    } if (evt.target) {
      this.updateData({
        pointOffersList: getOffersCheckedList(),
      }, true);
    }
  }

  _pointPriceToggleHandler(evt) {
    if (evt.target.value) {
      evt.preventDefault();
      this.updateData({
        pointPrice: Number(evt.target.value),
      }, true);
    }
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Form.parsePointToData(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  _editRollupHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditRollupHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editRollupHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(Form.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parsePointToData(items) {
    return Object.assign(
        {},
        items,
        {
          isStartTimeSelected: items.pointStartTime !== null,
          isEndTimeSelected: items.pointEndTime !== null,
          isPointPrice: items.pointPrice !== null,
          isOffers: items.pointOffersList !== null,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign(
        {},
        data);
    if (!data.isStartTimeSelected) {
      data.pointStartTime = null;
    }
    if (!data.isEndTimeSelected) {
      data.pointEndTime = null;
    }
    if (!data.isPointPrice) {
      data.pointPrice = null;
    }
    if (!data.isOffers) {
      data.pointOffersList = null;
    }

    delete data.isStartTimeSelected;
    delete data.isEndTimeSelected;
    delete data.isPointPrice;
    delete data.isOffers;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }

}

