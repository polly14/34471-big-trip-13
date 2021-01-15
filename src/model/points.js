import Observer from "../utils/observer.js";

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
    return {
      pointPrice: data.base_price,
      pointStartTime: data.date_from,
      pointEndTime: data.date_to,
      destination: data.destination.name,
      id: data.id,
      isFavorite: data.is_favorite,
      pointOffersList: data.offers,
      pointType: data.type,
    };
  }

  static adaptToServer(point) {
    return {
      "id": point.id,
      "type": point.pointType.toLowerCase(),
      "date_from": point.pointStartTime,
      "date_to": point.pointEndTime,
      "destination": point.destination,
      "base_price": point.pointPrice,
      "is_favorite": point.isFavorite,
      "offers": point.pointOffersList
    };
  }

}
