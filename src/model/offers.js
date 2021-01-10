import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  /*
      в поле offersList будет храниться массив с офферами.
      каждый оффер имеет следующую структур:
      {
        "type": "taxi",
        "offers": [
            {
              "title": "Upgrade to a business class",
              "price": 120
            }, {
              "title": "Choose the radio station",
              "price": 60
            }
        ]
      }
   */
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
    /* здесь на основе офферов, которые хранятся в модели точки, будут возвращаться те котороые выбраны
     т.е при загрузке данных с сервера, в точке будут хранится офферы следующего формата:
     "offers": [
        {
          "title": "Choose meal",
          "price": 180
        }, {
          "title": "Upgrade to comfort class",
          "price": 50
        }
      ]
      соответственно нам нужно вернуть список, где в каждом элементе будет содержаться флаг isChecked,
      как это сделано сейчас у тебя
     */

    const offersByPoint = this.getOffers(pointType);
    const offersName = offersList.map(({title}) => title);
    return offersByPoint.map((item) => Object.assign({}, item, {isChecked: offersName.includes(item.title)}));
  }
}

/*
  Список офферов храниться на сервере
  поэтому в презентере Trip их нужно будет сначала запросить с сервера,
  сложить в эту модель и только потом пользоваться
 */
