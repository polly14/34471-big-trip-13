import FilterView from "./view/filters.js";
import PriceView from "./view/price.js";
import SiteMenuView from "./view/site-menu.js";
import {generateRoutePoint} from "./mock/route-point.js";
import BoardPresenter from "./presenter/trip.js";
import {render, RenderPosition} from "./utils/render.js";

const POINTS_COUNT = 12;

const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);

points.sort((a, b) => a.pointStartTime - b.pointStartTime);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new PriceView(points), RenderPosition.AFTERBEGIN);
const tripInfo = document.querySelector(`.trip-info`);

const tripMainTripControls = document.querySelector(`.trip-main__trip-controls`);
const tripMainTripControlsTitles = tripMainTripControls.querySelectorAll(`h2.visually-hidden`);
render(tripMainTripControlsTitles[0], new SiteMenuView(), RenderPosition.AFTEREND);
render(tripMainTripControlsTitles[1], new FilterView(), RenderPosition.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);

const boardPresenter = new BoardPresenter(tripEvents, tripInfo);
boardPresenter.init(points);
