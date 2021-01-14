import DaysView from "../view/days.js";
import NoPointsView from "../view/no-points.js";
import RouteInfoView from "../view/route-info.js";
import PriceView from "../view/price.js";
import SortingView from "../view/sorting.js";
import TripEventsMsgView from "../view/trip-events-msg.js";
import PointPresenter from "./point.js";
import PointNewPresenter from "./point-new.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortPointTimeChange, sortPointPriceChange, sortDefault} from "../utils/point.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";
import {filter} from "../utils/filter.js";

export default class Trip {
  constructor(boardContainer, tripInfoContainer, pointsModel, filterModel, offersModel, destinationsModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._boardContainer = boardContainer;
    this._sortComponent = null;
    this._daysComponent = new DaysView();
    this._tripEventsMsgComponent = new TripEventsMsgView();
    this._noPointsComponent = new NoPointsView();
    this._tripInfoContainer = tripInfoContainer;
    this._pointPresenter = {};
    this._dayInfoPresenter = [];
    this._pricePresenter = [];
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._pointNewPresenter = new PointNewPresenter(this._boardContainer, this._handleViewAction, this._offersModel, this._destinationsModel);
  }

  init() {
    render(this._boardContainer, this._daysComponent, RenderPosition.BEFOREEND);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderBoard();
  }

  hide() {
    this._boardContainer.classList.add(`visually-hidden`);

    //    remove(this._daysComponent);
    //    this._pointsModel.removeObserver(this._handleModelEvent);
    //    this._filterModel.removeObserver(this._handleModelEvent);
  }

  show() {
    this._clearBoard({resetSortType: true});
    this._boardContainer.classList.remove(`visually-hidden`);
    this._renderBoard();
  }

  createPoint(callback) {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {

    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortDefault);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTimeChange);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPriceChange);
    }
    return filteredPoints;
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._tripEventsMsgComponent);
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();

    this._renderBoard();
  }

  _renderNoPoints() {
    render(this._boardContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderRouteInfo(points) {
    const routeInfoComponent = new RouteInfoView(points);
    render(this._tripInfoContainer, routeInfoComponent, RenderPosition.AFTERBEGIN);
    this._dayInfoPresenter.push(routeInfoComponent);
  }

  _renderPrice(points) {
    const priceComponent = new PriceView(points);
    render(this._tripInfoContainer, priceComponent, RenderPosition.AFTERBEGIN);
    this._pricePresenter.push(priceComponent);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortingView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    //    const offers = this._offersModel.getOffers(point.pointType);
    //    const checkedOffers = this._offersModel.getCheckedOffers(offers, point.pointType);
    //    const destination = this._destinationsModel.getDestinations(point.destination);

    const pointPresenter = new PointPresenter(this._daysComponent, this._handleViewAction, this._handleModeChange, this._offersModel, this._destinationsModel);
    pointPresenter.init(point, this._offersModel, this._destinationsModel);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderTripEventsMsg() {
    render(this._boardContainer, this._tripEventsMsgComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    this._dayInfoPresenter.forEach((routeInfoComponent) => remove(routeInfoComponent));
    this._dayInfoPresenter = [];

    this._pricePresenter.forEach((priceComponent) => remove(priceComponent));
    this._pricePresenter = [];

    remove(this._noPointsComponent);
    remove(this._tripEventsMsgComponent);
    remove(this._sortComponent);
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {

    if (this._isLoading) {
      this._renderTripEventsMsg();
      return;
    }

    const points = this._getPoints();
    if (points.length === 0) {
      this._renderNoPoints();
    } else {
      this._renderSort();
      this._renderPrice(points);
      this._renderRouteInfo(points);
      this._renderPoints(points);
    }

  }
}
