import * as React from 'react';
import styled from 'styled-components';
import Slider from 'react-input-slider';
import { IconPlay, IconStop, IconTrash, IconSave, IconLoad } from './Icons';
import { OscillatorType } from '../types/soundTypes';

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 2.4rem 2rem 1.5rem;
  background-color: var(--wrapper-bg);
  box-shadow: var(--hover-shadow);
  border-radius: 1.2rem;
  border: 1px solid var(--wrapper-border);
  display: flex;
  h1 {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--title-color);
    line-height: 1.4rem;
    margin: 0 auto 1.6rem;
    display: block;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1.345em;
  }
  .primary-ui.mobile-play-control {
    display: none;
  }
  .primary-ui {
    margin: 3rem 0 0 2rem;
    padding: 0.4rem 0;
    height: 50.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    button {
      width: 5rem;
      height: 5rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      cursor: pointer;
      &.playback {
        background-color: var(--play-btn);
      }
      &.trash {
        background-color: var(--trash-btn);
      }
      &:hover {
        transform: scale(1.05);
      }
    }
    button + button {
      margin-top: 1.3rem;
    }
    .play-control {
      display: flex;
      flex-direction: column;
    }
    .slider-control {
      display: flex;
    }
    .slider {
      display: flex;
      width: 2.4rem;
      align-items: center;
      flex-direction: column;
      font-weight: bold;
      letter-spacing: 0.05em;
      .label {
        color: var(--input-label);
        font-size: 1rem;
        margin-top: 1rem;
      }
      .value {
        font-size: 1.2rem;
        color: var(--input-value);
      }
    }
    .slider + .slider {
      margin-left: 1rem;
    }
  }
  .secondary-ui {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dropdowns {
      display: flex;
      align-items: baseline;
    }
    .slider-control {
      display: none;
    }
    .buttons {
      display: flex;
    }
    .select-wrap {
      width: 10rem;
      position: relative;
      background-color: var(--input-bg);
      border: 1px solid var(--input-ui);
      margin-right: 1.5rem;
      &::after,
      &::before {
        content: '';
        position: absolute;
        pointer-events: none;
      }
      &::after {
        top: 50%;
        right: 0.5rem;
        width: 0;
        height: 0;
        margin-top: -2px;
        border-top: 0.5rem solid #fff;
        border-right: 0.4rem solid transparent;
        border-left: 0.4rem solid transparent;
      }
      &::before {
        right: 0;
        top: 0;
        bottom: 0;
        width: 2rem;
        background-color: var(--input-ui);
      }
    }
    label,
    select {
      letter-spacing: 0.05em;
      font-weight: bold;
      font-size: 1rem;
    }
    label {
      text-transform: uppercase;
      color: var(--input-label);
      margin: 0 0.4rem;
    }
    select {
      cursor: pointer;
      text-transform: capitalize;
      color: var(--input-value);
      background-color: transparent;
      padding: 0.6rem;
      position: relative;
      border: none;
      outline: none;
      width: 100%;
      margin-right: 1.5rem;
      appearance: none;
    }
    button {
      background-color: var(--input-ui);
      color: #fff;
      font-size: 1.12rem;
      letter-spacing: 0.05em;
      border: none;
      outline: none;
      font-weight: bold;
      display: flex;
      padding: 0.6rem 1.2rem;
      border-radius: 4rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: color 0.2s, transform 0.2s, background-color 0.2s;
      svg {
        margin-right: 0.6rem;
        transition: fill 0.2s;
      }
      &:hover {
        transform: translateY(-1px);
        background-color: var(--input-accent);
        color: var(--wrapper-bg);
        svg path {
          fill: var(--wrapper-bg);
        }
      }
    }
    button + button {
      margin-left: 0.5rem;
    }
  }
  @media screen and (max-width: 680px) {
    h1 {
      max-width: 30rem;
      text-align: left;
      margin: 0 0 1rem 1rem;
    }
    .primary-ui {
      display: none;
    }
    .primary-ui.mobile-play-control {
      flex-direction: row;
      margin: 0 0 1rem;
      height: auto;
      display: flex;
      justify-content: flex-end;
      button {
        display: inline-flex;
        margin: 0;
        width: 4rem;
        height: 4rem;
        svg {
          transform: scale(0.8);
        }
      }
      button + button {
        margin-left: 1rem;
      }
    }

    .secondary-ui {
      width: 35rem;
      align-items: flex-start;
      .buttons {
        flex-basis: 17rem;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .slider-control {
        display: block;
      }
      .slider {
        display: flex;
        height: 2.4rem;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
        letter-spacing: 0.05em;
        .label {
          color: var(--input-label);
          font-size: 1rem;
        }
        .value {
          font-size: 1.2rem;
          margin: 0 1rem 0 0.25rem;
          color: var(--input-value);
          white-space: nowrap;
        }
      }
      .slider + .slider {
        margin-top: 1rem;
        margin-bottom: 1.5rem;
      }
      .dropdowns {
        flex-wrap: wrap;
        flex-basis: 17rem;
        justify-content: flex-end;
        .select-wrap,
        .select-wrap select {
          margin-right: 0;
        }
        .select-wrap:first-of-type,
        label:first-of-type {
          margin-bottom: 0.7rem;
        }
      }
    }
  }
`;

type PlaybackButtonProps = {
  isPlaying: boolean;
  isMobile?: boolean;
  reset: () => void;
  togglePlay: () => void;
};

const PlaybackButtons: React.FC<PlaybackButtonProps> = ({
  togglePlay,
  reset,
  isPlaying,
  isMobile = false,
}) => (
  <div className={isMobile ? 'primary-ui mobile-play-control' : 'play-control'}>
    <button onClick={togglePlay} className="playback">
      {isPlaying ? <IconStop /> : <IconPlay />}
    </button>
    <button onClick={reset} className="trash">
      <IconTrash />
    </button>
  </div>
);

type SliderProps = {
  currentBPM: number;
  currentVol: number;
  setCurrentVol: (n: number) => void;
  setCurrentBPM: (n: number) => void;
  isMobile?: boolean;
};

const SliderControls: React.FC<SliderProps> = ({
  currentBPM,
  currentVol,
  setCurrentVol,
  setCurrentBPM,
  isMobile = false,
}) => {
  const controls = [
    {
      name: 'VOL',
      value: currentVol,
      format: Math.round(currentVol * 10) + 20,
      min: -2,
      max: 0,
      step: 0.1,
      cb: setCurrentVol,
    },
    {
      name: 'BPM',
      value: currentBPM,
      format: currentBPM,
      min: 80,
      max: 160,
      step: 10,
      cb: setCurrentBPM,
    },
  ];
  return (
    <div className="slider-control">
      {!isMobile &&
        controls.map(({ name, step, value, min, max, cb, format }) => (
          <div className="slider" key={name}>
            <Slider
              axis="y"
              ystep={step}
              ymin={min}
              ymax={max}
              y={value}
              yreverse
              onChange={({ y }) => cb(y)}
              styles={{
                track: {
                  backgroundColor: 'var(--input-bg)',
                  height: 100,
                },
                active: {
                  backgroundColor: 'var(--input-active)',
                },
              }}
            />
            <span className="label">{name}</span>
            <span className="value">{format}</span>
          </div>
        ))}
      {isMobile &&
        controls.map(({ name, step, value, min, max, cb, format }) => (
          <div className="slider" key={name}>
            <span className="label">
              {name}
              <span className="value">{format}</span>
            </span>
            <Slider
              axis="x"
              xstep={step}
              xmin={min}
              xmax={max}
              x={value}
              onChange={({ x }) => cb(x)}
              styles={{
                track: {
                  backgroundColor: 'var(--input-bg)',
                  width: `10rem`,
                  height: 10,
                },
                active: {
                  backgroundColor: 'var(--input-active)',
                },
              }}
            />
          </div>
        ))}
    </div>
  );
};

type DropdownProps = {
  oscillator: OscillatorType;
  scaleName: string;
  setOscillator: (n: OscillatorType) => void;
  setScaleName: React.Dispatch<React.SetStateAction<string>>;
};
const Dropdowns: React.FC<DropdownProps> = ({
  oscillator,
  scaleName,
  setOscillator,
  setScaleName,
}) => {
  const controls = [
    {
      id: 'scale',
      label: 'Scale',
      defaultValue: scaleName,
      cb: (target: string) => setScaleName(target),
      options: ['major', 'minor', 'suspended'],
    },
    {
      id: 'oscillator',
      label: 'Waveform',
      defaultValue: oscillator,
      cb: (target: string) => setOscillator(target as OscillatorType),
      options: ['sine', 'square', 'triangle', 'sawtooth'],
    },
  ];
  return (
    <div className="dropdowns">
      {controls.map(({ id, label, defaultValue, cb, options }) => (
        <React.Fragment key={id}>
          <label htmlFor={id}>{label}</label>
          <div className="select-wrap">
            <select
              name={id}
              id={id}
              onChange={e => cb(e.currentTarget.value)}
              value={defaultValue}
            >
              {options.map(thing => (
                <option value={thing} key={thing}>
                  {thing}
                </option>
              ))}
            </select>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
type DataButtonProp = {
  openModal: (target: string) => void;
};
const DataButtons: React.FC<DataButtonProp> = ({ openModal }) => (
  <>
    <button type="button" data-action="save" onClick={() => openModal('save')}>
      <IconSave /> Save
    </button>
    <button type="button" data-action="load" onClick={() => openModal('load')}>
      <IconLoad /> Load
    </button>
  </>
);
export { Wrapper, PlaybackButtons, SliderControls, Dropdowns, DataButtons };
