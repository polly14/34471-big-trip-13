import DaysView from "../view/days.js";
import NoPointsView from "../view/no-points.js";
import RouteInfoView from "../view/route-info.js";
import SortingView from "../view/sorting.js";
import TripEventsMsgView from "../view/trip-events-msg.js";
import PointPresenter from "./point.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Trip {
  constructor(boardContainer, tripInfoContainer) {
    this._boardContainer = boardContainer;
    this._sortComponent = new SortingView();
    this._daysComponent = new DaysView();
    this._tripEventsMsgComponent = new TripEventsMsgView();
    this._noPointsComponent = new NoPointsView();
    this._tripInfoContainer = tripInfoContainer;
    this._pointPresenter = {};
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(boardPoints) {
    this._boardPoints = boardPoints.slice();
    render(this._boardContainer, this._daysComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._boardPoints = updateItem(this._boardPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderNoPoints() {
    render(this._boardContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderRouteInfo(points) {
    const routeInfoComponent = new RouteInfoView(points);
    render(this._tripInfoContainer, routeInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._daysComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(from, to) {
    this._boardPoints
      .slice(from, to)
      .forEach((boardPoint) => this._renderPoint(boardPoint));
  }

  _renderTripEventsMsg() {
    render(this._boardContainer, this._tripEventsMsgComponent, RenderPosition.BEFOREEND);
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderPointsList() {
    this._renderRouteInfo(this._boardPoints);
    this._renderPoints(0, this._boardPoints.length);
  }

  _renderBoard() {

    if (this._boardPoints.length === 0) {
      this._renderNoPoints();
    } else {
      this._renderSort();
      this._renderPointsList();
    }

  }
}
