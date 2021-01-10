import Observer from "../utils/observer.js";

export default class Destinations extends Observer {
  /*
      в поле destinationsList будет храниться массив с описаниями.
      каждое описание имеет следующую структур:
      {
          "description": "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
          "name": "Chamonix",
          "pictures": [
            {
              "src": "http://picsum.photos/300/200?r=0.0762563005163317",
              "description": "Chamonix parliament building"
            }
          ]
      }
   */
  constructor(destinationsList) {
    super();
    this.setDestinations(destinationsList);
  }

  getDestinations(destinationName) {
    return this._destinationsList.find(({name}) => name === destinationName);
  }

  setDestinations(destinationsList) {
    if (destinationsList && Array.isArray(destinationsList) && destinationsList.length > 0) {
      this._destinationsList = destinationsList;
    }
  }
}


/*
  Все описания хранятся на сервере,
  поэтому в презентере Trip их нужно будет сначала запросить с сервера,
  сложить в эту модель и только потом пользоваться
 */
