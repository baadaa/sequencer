const getHour = (hour: number) => {
  if (hour === 0 || hour === 12) return 12;
  return hour > 12 ? hour - 12 : hour;
};

export const getTime = () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return { hour, minute, second };
};

export const displayHour = (
  hour: number,
  minute: number,
  cutoff: number = 30
) => {
  const currentHour = getHour(hour);
  const nextHour = currentHour === 12 ? 1 : currentHour + 1;
  return minute <= cutoff ? currentHour : nextHour;
};

export const exactMinute = (minute: number, val: number) => {
  switch (val) {
    case 0:
      return minute === 0;
    case 1:
      return [1, 21, 39, 59].indexOf(minute) !== -1;
    case 2:
      return [2, 22, 38, 58].indexOf(minute) !== -1;
    case 3:
      return [3, 23, 37, 57].indexOf(minute) !== -1;
    case 4:
      return [4, 56, 24, 36].indexOf(minute) !== -1;
    case 5:
      return [5, 55, 25, 35].indexOf(minute) !== -1;
    case 6:
      return [6, 54, 26, 34].indexOf(minute) !== -1;
    case 7:
      return [7, 53, 27, 33].indexOf(minute) !== -1;
    case 8:
      return [8, 52, 18, 42, 28, 32].indexOf(minute) !== -1;
    case 9:
      return [9, 51, 19, 41, 29, 31].indexOf(minute) !== -1;
    case 10:
      return [10, 50].indexOf(minute) !== -1;
    case 11:
      return [11, 49].indexOf(minute) !== -1;
    case 12:
      return [12, 48].indexOf(minute) !== -1;
    case 13:
      return [13, 47].indexOf(minute) !== -1;
    case 14:
      return [14, 46].indexOf(minute) !== -1;
    case 15:
      return [15, 45].indexOf(minute) !== -1;
    case 16:
      return [16, 44].indexOf(minute) !== -1;
    case 17:
      return [17, 43].indexOf(minute) !== -1;
    case 18:
      return [18, 42].indexOf(minute) !== -1;
    case 19:
      return [19, 41].indexOf(minute) !== -1;
    case 20:
      return (minute >= 20 && minute < 30) || (minute > 30 && minute <= 40);
    case 30:
      return minute === 30;
  }
};
export const isMorning = (hour: number) => hour >= 4 && hour < 12;
export const isAfternoon = (hour: number) => hour >= 12 && hour < 18;
export const isNoon = (hour: number, minute: number) =>
  (hour === 11 && minute > 30) || (hour === 12 && minute <= 30);
export const isEvening = (hour: number) => hour >= 18 && hour < 21;
export const isNight = (hour: number) => hour >= 21 || hour < 4;
export const isBefore30 = (minute: number) => minute > 0 && minute <= 30;
export const isRoughlyBefore30 = (minute: number) => minute >= 5 && minute < 35;

export const roundedMinute = (minute: number, val: number) => {
  switch (val) {
    case 0:
      return minute >= 0 && minute < 5;
    case 5:
      return (minute >= 5 && minute < 10) || (minute >= 55 && minute <= 59);
    case 10:
      return (minute >= 10 && minute < 15) || (minute >= 50 && minute < 55);
    case 15:
      return (minute >= 15 && minute < 20) || (minute >= 45 && minute < 50);
    case 20:
      return (minute >= 20 && minute < 25) || (minute >= 40 && minute < 45);
    case 25:
      return (minute >= 25 && minute < 30) || (minute >= 35 && minute < 40);
    case 30:
      return minute >= 30 && minute < 35;
  }
};
