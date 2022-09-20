// https://www.maxlaumeister.com/tonematrix/ for functionality, filter and synth options
// https://codesandbox.io/s/sequencer-demo-wjgg4?file=/src/Sequencer.js for sequencing reference with Tone.Sequencer
// https://medium.com/geekculture/creating-a-step-sequencer-with-tone-js-32ea3002aaf5#d7bc for sequencing reference with Tone.Transport.scheduleRepeat (mono synth)
// https://www.devbridge.com/articles/tonejs-coding-music-production-guide/ for production sample

import * as React from 'react';
import * as Tone from 'tone';
import styled from 'styled-components';
import { defaultNoteMatrix, emptyBeat, SCALES } from './data';
import { OscillatorType } from './types/soundTypes';
import { IconPlay, IconStop, IconTrash } from './components/Icons';

const Wrapper = styled.div`
  padding: 2.4rem 2rem 1.5rem;
  background-color: var(--wrapper-bg);
  box-shadow: var(--base-shadow);
  border-radius: 1.2rem;
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
  .primary-ui {
    margin: 3.5rem 0 0 2rem;
    display: flex;
    flex-direction: column;
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
      flex-direction: column;
    }
  }
`;
const GridStyle = styled.div`
  --gap: 0.5rem;
  border-radius: 0.8rem;
  width: 52.7rem;
  background-color: #fff;
  height: 50rem;
  display: flex;
  padding: 1.5rem;
  margin-bottom: 1rem;
  .beat {
    display: flex;
    flex: 1;
    flex-direction: column;
    &[data-active='1'] {
      .note {
        background: var(--cyan200);
        &[data-on='1'] {
          background: var(--cyan600);
        }
      }
    }
    &:first-of-type {
      flex: 0;
      margin-right: var(--gap);
    }
  }

  .beat + .beat {
    margin-left: var(--gap);
  }
  .head,
  .note {
    padding: 0;
    flex: 1;
    margin: 0;
    border: none;
    outline: none;
    cursor: pointer;
    background: var(--cyan100);
    &[data-on='1'] {
      background: var(--cyan500);
    }
  }
  .head {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .note + .note {
    margin-top: var(--gap);
  }
`;

const filter = new Tone.Filter({
  frequency: 1100,
  rolloff: -12,
}).toDestination();
const synth = new Tone.PolySynth().connect(filter).set({
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1,
  },
});

function App() {
  type Loop = {
    dispose: any;
  };
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentBeat, setCurrentBeat] = React.useState(0);
  const [currentBPM, setCurrentBPM] = React.useState(120);
  const [oscillator, setOscillator] =
    React.useState<OscillatorType>('triangle');
  const [noteMatrix, setNoteMatrix] = React.useState(defaultNoteMatrix);
  const [currentScale, setCurrentScale] = React.useState(SCALES.major);
  const loop = React.useRef<Loop | null>(null);
  const noteMap = noteMatrix.map(beat =>
    beat
      .map((note, i) => {
        return { note: currentScale[i], on: note };
      })
      .filter(note => note.on)
      .map(item => item.note)
  );

  const playSingleNote = (note = '') => synth.triggerAttackRelease(note, '16n');
  const tick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const currentBeat = parseFloat(e.currentTarget.dataset.beat!);
    const selectedNote = parseFloat(e.currentTarget.dataset.index!);
    const isOn = e.currentTarget.dataset.on === '1' ? 0 : 1;
    const updatedMatrix = [...noteMatrix];

    playSingleNote(currentScale[selectedNote]);
    updatedMatrix[currentBeat][selectedNote] = isOn;
    setNoteMatrix(updatedMatrix);
  };
  const reset = React.useCallback(() => {
    setNoteMatrix([
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
      [...emptyBeat],
    ]);
    setIsPlaying(false);
    Tone.Transport.stop();
  }, []);

  React.useEffect(() => {
    Tone.Transport.loop = false;
    Tone.Transport.on('stop', () => setCurrentBeat(0));
  }, []);
  React.useEffect(() => {
    synth.set({
      oscillator: {
        type: oscillator,
      },
    });
  }, [oscillator]);
  React.useEffect(() => {
    Tone.Transport.bpm.value = currentBPM;
  }, [currentBPM]);
  React.useEffect(() => {
    const low = -20; // volume when all notes are playing. lower to prevent peaking
    const high = -10; // volume whan one note is playing

    if (loop.current) {
      loop.current.dispose();
    }
    loop.current = new Tone.Sequence(
      (time, beat) => {
        setCurrentBeat(beat);
        // Adjust the volume per the number of notes
        const vol = ((16 - noteMap[beat].length) / 16) * (high - low) + low;
        synth.volume.setValueAtTime(vol, time);
        synth.triggerAttackRelease(noteMap[beat], '16n', time);
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      '16n'
    ).start(0);
  }, [noteMap, isPlaying]);
  const togglePlay = React.useCallback(() => {
    Tone.context.resume();
    Tone.Transport.toggle();
    setIsPlaying(isPlaying => !isPlaying);
  }, []);
  return (
    <Wrapper>
      <div className="grid-are">
        <h1>Pentatonic Sequencer</h1>
        <GridStyle>
          <div className="beat">
            {currentScale.map((note, i) => (
              <div className="head" key={i}>
                {note}
              </div>
            ))}
          </div>
          {noteMatrix.map((beat, i) => (
            <div
              className="beat"
              key={i}
              data-active={isPlaying && currentBeat === i ? 1 : 0}
            >
              {currentScale.map((note, j) => (
                <button
                  className="note"
                  key={j}
                  onClick={tick}
                  data-note={note}
                  data-on={beat[j]}
                  data-beat={i}
                  data-index={j}
                />
              ))}
            </div>
          ))}
        </GridStyle>
        <div className="secondary-ui">
          Scale
          <select
            name="scale"
            id="scale"
            defaultValue="major"
            onChange={e => setCurrentScale(SCALES[e.currentTarget.value])}
          >
            {['major', 'minor', 'suspended'].map(scale => (
              <option value={scale} key={scale}>
                {scale}
              </option>
            ))}
          </select>
          BPM
          <select
            name="bpm"
            id="bpm"
            onChange={e => setCurrentBPM(parseFloat(e.currentTarget.value))}
            defaultValue={currentBPM}
          >
            {[80, 100, 120, 140, 160, 180, 200].map(bpm => (
              <option value={bpm} key={bpm}>
                {bpm}
              </option>
            ))}
          </select>
          Oscillator
          <select
            name="oscillator"
            id="oscillator"
            onChange={e =>
              setOscillator(e.currentTarget.value as OscillatorType)
            }
            defaultValue={oscillator}
          >
            {['sine', 'square', 'triangle', 'sawtooth'].map(type => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="primary-ui">
        <div className="play-control">
          <button onClick={togglePlay} className="playback">
            {isPlaying ? <IconStop /> : <IconPlay />}
          </button>
          <button onClick={reset} className="trash">
            <IconTrash />
          </button>
        </div>
        <div className="slider-control">
          <input
            className="input-range"
            type="range"
            step={20}
            value={currentBPM}
            onChange={e => setCurrentBPM(parseFloat(e.currentTarget.value))}
            min={80}
            max={200}
          />
          <input
            className="input-range"
            type="range"
            step={20}
            value={currentBPM}
            onChange={e => setCurrentBPM(parseFloat(e.currentTarget.value))}
            min={80}
            max={200}
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
