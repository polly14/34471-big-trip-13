import Observer from "../utils/observer.js";

export default class Destinations extends Observer {

  constructor(destinationsList) {
    super();
    this.setDestinations(destinationsList);
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
    const names = [];
    for (let i = 0; i < this._destinationsList.length; i++) {
      names.push(this._destinationsList[i].name);
    }
    return names;
  }

  static adaptToClient(data) {
    return {
      name: data.name,
      description: data.description,
      pictures: data.pictures
    };
  }

}
