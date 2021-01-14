import dayjs from "dayjs";
import {TYPES, DESTINATIONS, OFFERS} from "../const.js";
import {getRandomInteger} from "../utils/common.js";

export const generateOffer = (item) => {

  for (let i = 0; i < OFFERS.length; i++) {
    if (OFFERS[i].type === item.toLowerCase()) {
      const currentOffer = OFFERS[i].offers;
      for (let j = 0; j < currentOffer.length; j++) {
        currentOffer[j].isOfferChecked = 1;
      }
      return currentOffer;
    }
  }
  return ``;

};

const generatePointOffers = () => {
  const currentOffer = OFFERS[getRandomInteger(0, OFFERS.length - 1)].offers;
  const offersList = new Array(currentOffer.length).fill().map(() => ({title: currentOffer[getRandomInteger(0, currentOffer.length - 1)].title, price: getRandomInteger(10, 100), isOfferChecked: 1}));
  return offersList;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getRandomPointType = () => {
  const randomIndexTypes = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndexTypes];
};


const generateDestination = () => {
  const randomIndexDest = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndexDest].name;
};

export const generateDescription = (item) => {

  for (let i = 0; i < DESTINATIONS.length; i++) {
    if (DESTINATIONS[i].name === item) {
      return DESTINATIONS[i].description;
    }
  }
  return ``;

};

export const generatePhotos = (item) => {
  for (let i = 0; i < DESTINATIONS.length; i++) {
    if (DESTINATIONS[i].name === item) {
      return DESTINATIONS[i].pictures;
    }
  }
  return ``;
};

const generatePrice = () => {
  return getRandomInteger(10, 200);
};

const generateStartDate = () => {
  const maxDaysGap = 7;
  const maxHoursGap = 23;
  const maxMinutesGap = 59;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  const date = dayjs().add(daysGap, `day`).add(hoursGap, `hour`).add(minutesGap, `minute`);
  return date.toDate();
};

const generateEndDate = () => {
  const maxDaysGap = 7;
  const maxHoursGap = 23;
  const maxMinutesGap = 59;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  const date = dayjs().add(daysGap, `day`).add(hoursGap, `hour`).add(minutesGap, `minute`);
  return date.toDate();
};

export const generateRoutePoint = () => {

  return {
    pointType: getRandomPointType(),
    pointOffersList: generatePointOffers(),
    destination: generateDestination(),
    pointPrice: generatePrice(),
    pointStartTime: generateStartDate(),
    pointEndTime: generateEndDate(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    id: generateId()
  };
};
