import dayjs from "dayjs";

const getDurationDays = (dateB, dateC) => {

  const b = dayjs(dateB);
  const a = dayjs(dateC);

  const days = a.diff(b, `days`);

  return Number(days);

};

export const getTypeMoney = (points, type) => {

  return points.filter((point) => point.pointType === type).reduce((sum, point) => sum + Number(point.pointPrice), 0);

};

export const getTypeNumber = (points, type) => {

  return points.filter((point) => point.pointType === type).length;

};

export const getTypeTime = (points, type) => {

  return points.filter((point) => point.pointType === type).reduce((sum, point) => sum + getDurationDays(point.pointStartTime, point.pointEndTime), 0);

};
