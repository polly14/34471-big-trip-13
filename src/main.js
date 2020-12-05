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
import {render, RenderPosition, replace} from "./utils/render.js";

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

const renderPoint = (pointListElement, point) => {
  const pointComponent = new RoutePointView(point);
  const pointEditComponent = new FormView(point);

  const replaceCardToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardPoints) => {
  if (boardPoints.length === 0) {
    render(boardContainer, new NoPointsView(), RenderPosition.BEFOREEND);
  } else {
    render(tripInfo, new RouteInfoView(boardPoints), RenderPosition.AFTERBEGIN);
    render(boardContainer, new SortingView(), RenderPosition.BEFOREEND);
    const pointListComponent = new DaysView();
    render(boardContainer, pointListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < POINTS_COUNT; i++) {
      renderPoint(pointListComponent, boardPoints[i]);
    }
  }
};

renderBoard(tripEvents, points);

render(tripEvents, new TripEventsMsgView(), RenderPosition.BEFOREEND);
