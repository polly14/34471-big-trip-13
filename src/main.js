import {createDaysTemplate} from "./view/days.js";
import {createFilterTemplate} from "./view/filters.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {createFormNewTemplate} from "./view/form-new.js";
import {createNoPointsTemplate} from "./view/no-points.js";
import {createPriceTemplate} from "./view/price.js";
import {createRouteInfoTemplate} from "./view/route-info.js";
import {createRoutePointTemplate} from "./view/route-point.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createTripEventsMsgTemplate} from "./view/trip-events-msg.js";

const POINTS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createPriceTemplate(), `afterbegin`);
const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, createRouteInfoTemplate(), `afterbegin`);

const tripMainTripControls = document.querySelector(`.trip-main__trip-controls`);
const tripMainTripControlsTitles = tripMainTripControls.querySelectorAll(`h2.visually-hidden`);
render(tripMainTripControlsTitles[0], createSiteMenuTemplate(), `afterend`);
render(tripMainTripControlsTitles[1], createFilterTemplate(), `afterend`);

const tripEvents = document.querySelector(`.trip-events`);

render(tripEvents, createFormNewTemplate(), `beforeend`);
render(tripEvents, createSortingTemplate(), `beforeend`);
render(tripEvents, createDaysTemplate(), `beforeend`);

const tripEventsList = document.querySelector(`.trip-events__list`);

for (let i = 0; i < POINTS_COUNT; i++) {
  render(tripEventsList, createRoutePointTemplate(), `beforeend`);
}
render(tripEventsList, createFormEditTemplate(), `beforeend`);


render(tripEvents, createTripEventsMsgTemplate(), `beforeend`);
render(tripEvents, createNoPointsTemplate(), `beforeend`);
