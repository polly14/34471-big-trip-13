import {FilterType} from "../const.js";
import {isDatePast, isDateFuture} from "./point.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateFuture(point.pointStartTime)),
  [FilterType.PAST]: (points) => points.filter((point) => isDatePast(point.pointEndTime))
};
