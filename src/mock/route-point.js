import dayjs from "dayjs";
import {TYPES, DESTINATIONS, OFFERS} from "../const.js";
import {getRandomInteger, shuffle} from "../utils/common.js";

export const generateOffer = () => {
  const randomOffer = OFFERS[getRandomInteger(0, OFFERS.length - 1)].offers;
  const offersList = new Array(randomOffer.length).fill().map(() => ({title: randomOffer[getRandomInteger(0, randomOffer.length - 1)].title, price: getRandomInteger(10, 100), isOfferChecked: 1}));
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

const generateDescription = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`);
  const randomIndex = getRandomInteger(1, 5);
  const textBlock = shuffle(text).slice(0, randomIndex);
  return `${textBlock.map((it) => `${it}`).join(``)}`;
};

export const generatePhotos = () => {
  const randomIndexDest = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndexDest].pictures;
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
    offersList: generateOffer(),
    destination: generateDestination(),
    description: generateDescription(),
    photos: generatePhotos(),
    pointPrice: generatePrice(),
    pointStartTime: generateStartDate(),
    pointEndTime: generateEndDate(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    id: generateId(),
  };
};
