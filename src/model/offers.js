import Observer from "../utils/observer.js";

export default class Offers extends Observer {

  constructor(offersList) {
    super();
    this.setOffers(offersList);
  }

  getOffers(pointType) {
    const offersByType = this._offersList.find(({type}) => type === pointType.toLowerCase());
    if (offersByType) {
      return offersByType.offers;
    }
    return [];
  }

  setOffers(offersList) {
    if (offersList && Array.isArray(offersList) && offersList.length > 0) {
      this._offersList = offersList;
    }
  }

  getCheckedOffers(offersList, pointType) {
    const offersByPoint = this.getOffers(pointType);
    const offersName = offersList.map(({title}) => title);
    return offersByPoint.map((item) => Object.assign({}, item, {isChecked: offersName.includes(item.title)}));
  }

  getAllTypes() {
    const types = [];
    for (let i = 0; i < this._offersList.length; i++) {
      types.push(this._offersList[i].type);
    }
    return types;
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
