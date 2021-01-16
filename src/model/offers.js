import Observer from "../utils/observer.js";

export default class Offers extends Observer {

  constructor() {
    super();
    this._offersList = [];
  }

  getOffers(pointType) {
    const offersByType = this._offersList.find(({type}) => type === pointType.toLowerCase());
    if (offersByType) {
      return offersByType.offers;
    }
    return [];
  }

  setOffers(updateType, offersList) {
    if (offersList && Array.isArray(offersList) && offersList.length > 0) {
      this._offersList = offersList;
      this._notify(updateType);
    }
  }

  getCheckedOffers(offersList, pointType) {
    const offersByPoint = this.getOffers(pointType);
    const offersName = offersList.map(({title}) => title);
    return offersByPoint.map((item) => Object.assign({}, item, {isChecked: offersName.includes(item.title)}));
  }

  getAllTypes() {
    return this._offersList.map(({type}) => type);
  }

  static adaptToClient(data) {
    return {
      type: data.type,
      offers: data.offers.map(({title, price}) => ({
        title,
        price
      }))
    };
  }

}
