import dayjs from "dayjs";

export const getCurrentDate = () => {
  return dayjs();
};

export const isDatePast = (date) => {
  return (date < getCurrentDate());
};

export const isDateFuture = (date) => {
  return (date > getCurrentDate());
};

export const dateHumanize = (d, format) => {
  return dayjs(d).format(format);
};

export const getDuration = (dateB, dateC) => {

  const b = dayjs(dateB);
  const a = dayjs(dateC);

  const minut = a.diff(b, `minutes`);
  const hours = a.diff(b, `hours`);
  const days = a.diff(b, `days`);

  if (days > 0) {
    return `${days}D ${hours - (days * 24)}H ${minut - (hours * 60)}M`;
  } else if (hours > 0) {
    return `${hours - (days * 24)}H ${minut - (hours * 60)}M`;
  } else {
    return `${minut - (hours * 60)}M`;
  }

};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortDefault = (a, b) => a.pointStartTime - b.pointStartTime;

export const sortPointTimeChange = (taskA, taskB) => {

  taskA.duration = dayjs(taskA.pointStartTime).diff(dayjs(taskA.pointEndTime));
  taskB.duration = dayjs(taskB.pointStartTime).diff(dayjs(taskB.pointEndTime));

  const weight = getWeightForNullDate(taskA.duration, taskB.duration);

  if (weight !== null) {
    return weight;
  }

  return taskA.duration - taskB.duration;
};

export const sortPointPriceChange = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.pointPrice, taskB.pointPrice);

  if (weight !== null) {
    return weight;
  }

  return taskB.pointPrice - taskA.pointPrice;
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, `D`);
};
