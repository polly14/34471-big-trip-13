import DaysView from "./view/days.js";
import FilterView from "./view/filters.js";
import FormView from "./view/form.js";
import NoPointsView from "./view/no-points.js";
import PriceView from "./view/price.js";
import RouteInfoView from "./view/route-info.js";
import RoutePointView from "./view/route-point.js";
import SiteMenuView from "./view/site-menu.js";
import SortingView from "./view/sorting.js";
import TripEventsMsgView from "./view/trip-events-msg.js";
import {generateRoutePoint} from "./mock/route-point.js";
import {render, RenderPosition} from "./utils/render.js";

const POINTS_COUNT = 15;

const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);

points.sort((a, b) => a.pointStartTime - b.pointStartTime);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new PriceView(points).getElement(), RenderPosition.AFTERBEGIN);
const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, new RouteInfoView(points).getElement(), RenderPosition.AFTERBEGIN);

const tripMainTripControls = document.querySelector(`.trip-main__trip-controls`);
const tripMainTripControlsTitles = tripMainTripControls.querySelectorAll(`h2.visually-hidden`);
render(tripMainTripControlsTitles[0], new SiteMenuView().getElement(), RenderPosition.AFTEREND);
render(tripMainTripControlsTitles[1], new FilterView().getElement(), RenderPosition.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new RoutePointView(point);
  const pointEditComponent = new FormView(point);

  const replaceCardToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  pointEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });


  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

render(tripEvents, new SortingView().getElement(), RenderPosition.BEFOREEND);
const pointListComponent = new DaysView();
render(tripEvents, pointListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < POINTS_COUNT; i++) {
  renderPoint(pointListComponent.getElement(), points[i]);
}

render(tripEvents, new TripEventsMsgView().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new NoPointsView().getElement(), RenderPosition.BEFOREEND);
