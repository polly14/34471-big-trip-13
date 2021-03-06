import Observer from "../utils/observer.js";

export default class Destinations extends Observer {

  constructor() {
    super();
    this._destinationsList = [];
  }

  setDestinations(updateType, destinationsList) {
    if (destinationsList && Array.isArray(destinationsList) && destinationsList.length > 0) {
      this._destinationsList = destinationsList.slice();
      this._notify(updateType);
    }
  }

  getDestinations(destinationName) {
    return this._destinationsList.find(({name}) => name === destinationName);
  }

  getAllDestinations() {
    return this._destinationsList.map(({name}) => name);
  }

  static adaptToClient(data) {
    return {
      name: data.name,
      description: data.description,
      pictures: data.pictures
    };
  }

}
