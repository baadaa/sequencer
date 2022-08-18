// https://www.maxlaumeister.com/tonematrix/ for functionality
// https://codesandbox.io/s/sequencer-demo-wjgg4?file=/src/Sequencer.js for sequencing reference with Tone.Sequencer
// https://medium.com/geekculture/creating-a-step-sequencer-with-tone-js-32ea3002aaf5#d7bc for sequencing reference with Tone.Transport.scheduleRepeat (mono synth)
// https://www.devbridge.com/articles/tonejs-coding-music-production-guide/ for production sample

import * as React from 'react';
import * as Tone from 'tone';
import styled from 'styled-components';
import { defaultNoteMatrix, emptyBeat, SCALES } from './data';
import { useCallback } from 'react';
const GridStyle = styled.div`
  width: 52rem;
  height: 50rem;
  display: flex;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  background-color: #fff;
  border: 1px solid var(--coolGray100);
  box-shadow: var(--base-shadow);
  grid-template-columns: repeat(17, 1fr);
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
    &:nth-of-type(4n + 1) {
      border-right: 1px solid var(--coolGray200);
      padding-right: 0.5rem;
    }
    &:last-of-type {
      border-right: none;
    }
  }

  .beat + .beat {
    margin-left: 0.5rem;
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
    margin-top: 0.5rem;
  }
`;

function App() {
  type Loop = {
    dispose: any;
  };
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentBeat, setCurrentBeat] = React.useState(0);
  const [currentBPM, setCurrentBPM] = React.useState(120);
  const [noteMatrix, setNoteMatrix] = React.useState(defaultNoteMatrix);
  const [currentScale, setCurrentScale] = React.useState(SCALES.major);
  const synth = new Tone.PolySynth().toDestination();
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
  const reset = useCallback(() => {
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

  // const repeat = () => {
  //   synth.triggerAttackRelease(noteMap[currentBeat], '16n');
  //   setCurrentBeat((currentBeat + 1) % 16);
  // };
  React.useEffect(() => {
    Tone.Transport.loop = false;
    // Tone.Transport.scheduleRepeat(repeat, '16n'); // Tone.Transport.loop = true;
    // Tone.Transport.loopEnd = '1m';
    Tone.Transport.on('stop', () => setCurrentBeat(0));
  });
  React.useEffect(() => {
    Tone.Transport.bpm.value = currentBPM;
  }, [currentBPM]);
  React.useEffect(() => {
    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].forEach(i => {
    //   synth.triggerAttackRelease(
    //     noteMap[i],
    //     '16n',
    //     i * (Tone.Time('1m').toSeconds() / 16)
    //   );
    // });
    if (loop.current) {
      loop.current.dispose();
    }
    loop.current = new Tone.Sequence(
      (time, beat) => {
        setCurrentBeat(beat);
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
    <>
      <GridStyle>
        <div className="beat">
          {currentScale.map((note, i) => (
            <div className="head" key={i}>
              {note}
            </div>
          ))}
        </div>
        {noteMatrix.map((beat, i) => (
          <div className="beat" key={i} data-active={currentBeat === i ? 1 : 0}>
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
      <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Play'}</button>
      <button onClick={reset}>Clear</button>
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
    </>
  );
}

export default App;
