import InfoContainerView from "./view/info-container.js";
import SiteMenuView from "./view/site-menu.js";
import {generateRoutePoint} from "./mock/route-point.js";
import BoardPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";

const POINTS_COUNT = 16;

const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);

points.sort((a, b) => a.pointStartTime - b.pointStartTime);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const filterModel = new FilterModel();
const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new InfoContainerView(), RenderPosition.AFTERBEGIN);
const tripInfo = document.querySelector(`.trip-info`);

const tripMainTripControls = document.querySelector(`.trip-main__trip-controls`);
const tripMainTripControlsTitles = tripMainTripControls.querySelectorAll(`h2.visually-hidden`);
render(tripMainTripControlsTitles[0], new SiteMenuView(), RenderPosition.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);

const boardPresenter = new BoardPresenter(tripEvents, tripInfo, pointsModel, filterModel);

const filterPresenter = new FilterPresenter(tripMainTripControlsTitles[1], filterModel, pointsModel);
filterPresenter.init();
boardPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createPoint();
});
