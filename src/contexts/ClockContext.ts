import { createContext, useContext } from 'react';

const now = new Date();
export type Time = {
  hour: number;
  minute: number;
  second: number;
};

export type TimeContextType = {
  time: Time;
  setTime: (value: Time) => void;
};

export const TimeContext = createContext<TimeContextType>({
  time: {
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
  },
  setTime: time => console.warn('no time provider', time),
});
export const useTime = (): TimeContextType => useContext(TimeContext);
