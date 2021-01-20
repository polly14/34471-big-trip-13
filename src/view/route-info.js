import AbstractView from "./abstract.js";
import {dateHumanize} from "../utils/point.js";

const createRouteInfoTemplate = (points) => {
  const destinationPoints = [];

  for (let a = 0; a < points.length; a++) {
    destinationPoints.push(points[a].nameDestination);
  }

  const start = points[0].pointStartTime;
  const end = points[points.length - 1].pointStartTime;

  const startDate = start ? dateHumanize(start, `MMM DD`) : `...`;
  const endDate = end ? dateHumanize(end, `MMM DD`) : `...`;

  const middlePoint = points.length - 2 ? ` &mdash; ... &mdash; ` : ` &mdash; `;

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">
      ${destinationPoints[0]}
      ${middlePoint}
      ${destinationPoints[destinationPoints.length - 1]}
    </h1>
    <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
  </div>`;
};

export default class RouteInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createRouteInfoTemplate(this._points);
  }

}
