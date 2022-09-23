export const normalizeVolume = ({ totalNotes = 16, activeNotes = 1 }) => {
  const low = -30; // volume when all notes are playing. lower to prevent peaking
  const high = -10; // volume whan one note is playing

  return ((totalNotes - activeNotes) / totalNotes) * (high - low) + low;
};

export const setLocalStorage = (key = '', data = ''): void => {
  window.localStorage.setItem(key, data);
};

export const localStorageIsAvailable = (data: string): boolean =>
  !!window.localStorage.getItem(data);
