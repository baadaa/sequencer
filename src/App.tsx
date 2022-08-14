import * as React from 'react';
import * as Tone from 'tone';
import styled from 'styled-components';
import { defaultNoteMatrix, emptyBeat, SCALES } from './data';
import { useCallback } from 'react';
const GridStyle = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  grid-template-columns: repeat(17, 1fr);
  .beat {
    display: flex;
    flex: 1;
    flex-direction: column;
    &[data-active='true'] {
      border: 1px solid red;
    }
  }
  .beat + .beat {
    margin-left: 5px;
  }
  .note {
    padding: 0;
    flex: 1;
    margin: 0;
    border: none;
    outline: none;
    cursor: pointer;
    background: var(--cyan100);
    &[data-on='true'] {
      background: var(--cyan500);
    }
  }
  .note + .note {
    margin-top: 5px;
  }
`;

function App() {
  type WhatEv = {
    dispose: any;
  };
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentBeat, setCurrentBeat] = React.useState(0);
  const [noteMatrix, setNoteMatrix] = React.useState(defaultNoteMatrix);
  const [scale, setScale] = React.useState(SCALES.pentatonic.major);
  const synth = new Tone.PolySynth().toDestination();
  const loop = React.useRef<WhatEv | null>(null);
  const noteMap = noteMatrix.map(beat =>
    beat
      .map((note, i) => {
        return { note: scale[i], on: note };
      })
      .filter(note => note.on)
      .map(item => item.note)
  );

  const tick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const currentBeat = parseFloat(e.currentTarget.dataset.beat!);
    const currentNoteIndex = parseFloat(e.currentTarget.dataset.index!);
    const isOn = e.currentTarget.dataset.on === 'true' ? false : true;
    const updatedMatrix = [...noteMatrix];
    updatedMatrix[currentBeat][currentNoteIndex] = isOn;
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

  React.useEffect(() => {
    Tone.Transport.on('stop', () => setCurrentBeat(0));
  });
  React.useEffect(() => {
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
        {noteMatrix.map((beat, i) => (
          <div className="beat" key={i} data-active={currentBeat === i}>
            {scale.map((note, j) => (
              <button
                className="note"
                key={j}
                onClick={tick}
                data-note={note}
                data-on={beat[j]}
                data-beat={i}
                data-index={j}
              ></button>
            ))}
          </div>
        ))}
      </GridStyle>
      <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Play'}</button>
      <button onClick={reset}>Clear</button>
      {currentBeat}
    </>
  );
}

export default App;
