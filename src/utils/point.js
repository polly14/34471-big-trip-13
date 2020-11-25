import dayjs from "dayjs";

export const getCurrentDate = () => {
  return dayjs();
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
