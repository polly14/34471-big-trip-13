import StatView from "./view/stat.js";
import InfoContainerView from "./view/info-container.js";
import SiteMenuView from "./view/site-menu.js";
import BoardPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import {isOnline} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";
import {toast} from "./utils/toast/toast.js";
import {END_POINT, AUTHORIZATION, MenuItem, UpdateType, FilterType} from "./const.js";
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new InfoContainerView(), RenderPosition.AFTERBEGIN);
const tripInfo = document.querySelector(`.trip-info`);

const tripMainTripControls = document.querySelector(`.trip-main__trip-controls`);
const tripMainTripControlsTitles = tripMainTripControls.querySelectorAll(`h2.visually-hidden`);

const siteMenuComponent = new SiteMenuView();

const tripEvents = document.querySelector(`.trip-events`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const boardPresenter = new BoardPresenter(tripEvents, tripInfo, pointsModel, filterModel, offersModel, destinationsModel, apiWithProvider);

const filterPresenter = new FilterPresenter(tripMainTripControlsTitles[1], filterModel, pointsModel);
filterPresenter.init();
boardPresenter.init();

let statisticsComponent = new StatView(pointsModel.getPoints());
render(tripEvents, statisticsComponent, RenderPosition.AFTEREND);
statisticsComponent.hide();

const handlePointNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[id=${MenuItem.POINTS}]`).classList.add(`trip-tabs__btn--active`);
  siteMenuComponent.setMenuItem(MenuItem.POINTS);
  document.querySelector(`.trip-tabs`).style.pointerEvents = ``;
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.POINTS:
      document.querySelector(`.page-main .page-body__container`).classList.remove(`noafter`);
      statisticsComponent.hide();
      boardPresenter.show();
      break;
    case MenuItem.STATISTICS:
      document.querySelector(`.page-main .page-body__container`).classList.add(`noafter`);
      statisticsComponent.init(pointsModel.getPoints());
      statisticsComponent.show();
      boardPresenter.hide();
      break;
  }
};

const eventAddBtn = document.querySelector(`.trip-main__event-add-btn`);
eventAddBtn.addEventListener(`click`, () => {
  statisticsComponent.hide();
  boardPresenter.hide();
  boardPresenter.show();
  document.querySelector(`.page-main .page-body__container`).classList.remove(`noafter`);
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

  if (!isOnline()) {
    toast(`You can't create new task offline`);
    siteMenuComponent.setMenuItem(MenuItem.POINTS);
    return;
  }

  boardPresenter.createPoint(handlePointNewFormClose);
  siteMenuComponent.removeActiveClass();
  document.querySelector(`.trip-tabs`).style.pointerEvents = `none`;
});

const unblockMenu = () => {
  render(tripMainTripControlsTitles[0], siteMenuComponent, RenderPosition.AFTEREND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
};

apiWithProvider.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.INIT, offers);
  })
  .catch(() => {
    offersModel.setOffers(UpdateType.INIT, []);
  });

apiWithProvider.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.INIT, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.INIT, []);
  });

apiWithProvider.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    unblockMenu();
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    unblockMenu();
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
