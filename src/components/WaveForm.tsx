import * as React from 'react';
import styled from 'styled-components';
import { OscillatorType } from '../types/soundTypes';
import { WaveSaw, WaveSine, WaveSquare, WaveTriangle } from './Icons';

const WaveStyles = styled.div`
  position: absolute;
  top: calc(50vh - 10px);
  left: -5px;
  right: 0;
  overflow: hidden;
  z-index: 1;
  svg {
    display: block;
    animation: breathe 15s linear infinite;
    transform-origin: left;
  }
  @keyframes breathe {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes breatheSideways {
    0% {
      transform: rotate(90deg) scale(1);
    }
    30% {
      transform: rotate(90deg) scale(1.1);
    }
    100% {
      transform: rotate(90deg) scale(1);
    }
  }
  @media screen and (max-width: 680px) {
    left: -50%;
    right: -50%;
    transform: rotate(90deg);
  }
`;

type WaveProps = {
  waveform: OscillatorType;
};
const WaveForm: React.FC<WaveProps> = ({ waveform }) => {
  return (
    <WaveStyles>
      {waveform === 'sine' && <WaveSine />}
      {waveform === 'sawtooth' && <WaveSaw />}
      {waveform === 'square' && <WaveSquare />}
      {waveform === 'triangle' && <WaveTriangle />}
    </WaveStyles>
  );
};

export default WaveForm;
