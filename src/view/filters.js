import AbstractView from "./abstract.js";
import {FilterType} from "../const.js";

const createItemFilter = (item) => {

  return `<div class="trip-filters__filter">
    <input id="filter-${item.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.toLowerCase()}">
    <label class="trip-filters__filter-label" for="filter-${item.toLowerCase()}">${item}</label>
  </div>`;
};

const filters = Object.keys(FilterType);
const createFilterTemplate = () => {

  const filterItemsTemplate = filters
    .map((item, index) => createItemFilter(item, index === 0))
    .join(``);

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};


export default class Filter extends AbstractView {

  getTemplate() {
    return createFilterTemplate();
  }

}
