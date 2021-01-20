export const AUTHORIZATION = `Basic f534hFg75ghnyfF56`;
export const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

export const MenuItem = {
  POINTS: `Table`,
  STATISTICS: `Stats`
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

export const OFFERS = [
  {
    "type": `taxi`,
    "offers": []
  }
];

export const TYPEGROUPS = [
  {
    type: `Taxi`,
    group: `Transfer`
  },
  {
    type: `Bus`,
    group: `Transfer`
  },
  {
    type: `Train`,
    group: `Transfer`
  },
  {
    type: `Ship`,
    group: `Transfer`
  },
  {
    type: `Transport`,
    group: `Transfer`
  },
  {
    type: `Drive`,
    group: `Transfer`
  },
  {
    type: `Flight`,
    group: `Transfer`
  },
  {
    type: `Check-in`,
    group: `Activity`
  },
  {
    type: `Sightseeing`,
    group: `Activity`
  },
  {
    type: `Restaurant`,
    group: `Activity`
  }
];

export const SortType = {
  DEFAULT: `day`,
  TIME: `time`,
  PRICE: `price`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};
