import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" id="${MenuItem.POINTS}" >${MenuItem.POINTS}</a>
    <a class="trip-tabs__btn " href="#" id="${MenuItem.STATISTICS}">${MenuItem.STATISTICS}</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._setMenuActiveItem = this._setMenuActiveItem.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _setMenuActiveItem(evt) {
    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);
    Array.from(items).forEach(function (e) {
      e.classList.remove(`trip-tabs__btn--active`);
    });
    this.getElement().querySelector(`[id=${evt.target.id}]`).classList.add(`trip-tabs__btn--active`);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
    this._setMenuActiveItem(evt);
  }

  removeActiveClass() {
    Array.from(this.getElement().querySelectorAll(`.trip-tabs__btn`)).forEach(function (e) {
      e.classList.remove(`trip-tabs__btn--active`);
    });
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[id=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }

}
