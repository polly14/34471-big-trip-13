import StatView from "./view/stat.js";
import InfoContainerView from "./view/info-container.js";
import SiteMenuView from "./view/site-menu.js";
import {generateRoutePoint} from "./mock/route-point.js";
import BoardPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {DESTINATIONS, OFFERS, MenuItem, UpdateType, FilterType} from "./const.js";

const POINTS_COUNT = 16;

const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);

points.sort((a, b) => a.pointStartTime - b.pointStartTime);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

destinationsModel.setDestinations(DESTINATIONS);
offersModel.setOffers(OFFERS);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new InfoContainerView(), RenderPosition.AFTERBEGIN);
const tripInfo = document.querySelector(`.trip-info`);

const tripMainTripControls = document.querySelector(`.trip-main__trip-controls`);
const tripMainTripControlsTitles = tripMainTripControls.querySelectorAll(`h2.visually-hidden`);

const siteMenuComponent = new SiteMenuView();
render(tripMainTripControlsTitles[0], siteMenuComponent, RenderPosition.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);

const boardPresenter = new BoardPresenter(tripEvents, tripInfo, pointsModel, filterModel, offersModel, destinationsModel);

const filterPresenter = new FilterPresenter(tripMainTripControlsTitles[1], filterModel, pointsModel);
filterPresenter.init();
boardPresenter.init();

const handlePointNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[id=${MenuItem.POINTS}]`).classList.add(`trip-tabs__btn--active`);
  siteMenuComponent.setMenuItem(MenuItem.POINTS);
  document.querySelector(`.trip-tabs`).style.pointerEvents = ``;
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.POINTS:
      remove(statisticsComponent);
      document.querySelector(`.page-main .page-body__container`).classList.remove(`noafter`);
      siteMenuComponent.getElement().querySelector(`[id=${MenuItem.STATISTICS}]`).classList.remove(`trip-tabs__btn--active`);
      siteMenuComponent.getElement().querySelector(`[id=${MenuItem.POINTS}]`).classList.add(`trip-tabs__btn--active`);
      boardPresenter.init();
      break;
    case MenuItem.STATISTICS:
      siteMenuComponent.getElement().querySelector(`[id=${MenuItem.POINTS}]`).classList.remove(`trip-tabs__btn--active`);
      siteMenuComponent.getElement().querySelector(`[id=${MenuItem.STATISTICS}]`).classList.add(`trip-tabs__btn--active`);
      boardPresenter.destroy();
      statisticsComponent = new StatView(pointsModel.getPoints());
      render(tripEvents, statisticsComponent, RenderPosition.AFTEREND);
      document.querySelector(`.page-main .page-body__container`).classList.add(`noafter`);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const eventAddBtn = document.querySelector(`.trip-main__event-add-btn`);
eventAddBtn.addEventListener(`click`, () => {
  remove(statisticsComponent);
  document.querySelector(`.page-main .page-body__container`).classList.remove(`noafter`);
  boardPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  boardPresenter.init();
  boardPresenter.createPoint(handlePointNewFormClose);
  siteMenuComponent.getElement().querySelector(`[id=${MenuItem.STATISTICS}]`).classList.remove(`trip-tabs__btn--active`);
  siteMenuComponent.getElement().querySelector(`[id=${MenuItem.POINTS}]`).classList.remove(`trip-tabs__btn--active`);
  document.querySelector(`.trip-tabs`).style.pointerEvents = `none`;
});

