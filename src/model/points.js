import Observer from "../utils/observer.js";
import dayjs from 'dayjs';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(data) {

    data = Object.assign(
        {},
        {
          pointPrice: data.base_price,
          pointStartTime: dayjs(data.date_from).toDate(),
          pointEndTime: dayjs(data.date_to).toDate(),
          destination: data.destination.name,
          id: data.id,
          isFavorite: data.is_favorite,
          pointOffersList: data.offers,
          pointType: data.type,
        }
    );

    delete data.base_price;
    delete data.date_from;
    delete data.date_to;
    delete data.destination.name;
    delete data.id;
    delete data.is_favorite;
    delete data.offers;
    delete data.type;

    return data;

  }

  static adaptToServer(point) {

    return Object.assign(
        {},
        point,
        {
          "id": point.id,
          "type": point.pointType.toLowerCase(),
          "date_from": point.pointStartTime.toISOString(),
          "date_to": point.pointEndTime.toISOString(),
          "destination.name": point.destination,
          "base_price": point.pointPrice,
          "is_favorite": point.isFavorite,
          "offers": point.pointOffersList
        }
    );
  }

}
