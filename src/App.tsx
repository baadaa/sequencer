import * as React from 'react';
import * as Tone from 'tone';

import ScaleGrid from './components/ScaleGrid';
import {
  Wrapper,
  PlaybackButtons,
  SliderControls,
  Dropdowns,
  DataButtons,
} from './components/InterfaceElements';

import { synth, playSingleNote } from './components/ToneSettings';
import { defaultNoteMatrix, emptyBeat, SCALES } from './data';
import { OscillatorType } from './types/soundTypes';
import {
  normalizeVolume,
  localStorageIsAvailable,
  setLocalStorage,
} from './utils';
import WaveForm from './components/WaveForm';
import Modal from './components/Modals';

import { ColorModeButton, GitHub } from './components/Miscellaneous';

function App() {
  type Loop = {
    dispose: any;
  };
  const [isDark, setIsDark] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentBeat, setCurrentBeat] = React.useState(0);
  const [currentBPM, setCurrentBPM] = React.useState(120);
  const [currentVol, setCurrentVol] = React.useState(-0.5);
  const [oscillator, setOscillator] = React.useState<OscillatorType>('sine');
  const [noteMatrix, setNoteMatrix] = React.useState(defaultNoteMatrix);
  const [scaleName, setScaleName] = React.useState('major');
  const [currentScale, setCurrentScale] = React.useState(SCALES[scaleName]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState('save');
  const loop = React.useRef<Loop | null>(null);
  const noteMap = noteMatrix.map(beat =>
    beat
      .map((note, i) => {
        return { note: currentScale[i], on: note };
      })
      .filter(note => note.on)
      .map(item => item.note)
  );

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

  const openModal = (target = '') => {
    setModalAction(target);
    setModalIsOpen(true);
  };
  React.useEffect(() => {
    Tone.Transport.loop = false;
    Tone.Transport.on('stop', () => setCurrentBeat(0));
  }, []);
  React.useEffect(() => {
    if (!localStorageIsAvailable('bald_tones_isDark')) {
      setIsDark(false);
      setLocalStorage('bald_tones_isDark', JSON.stringify(false));
      return;
    }
    const savedMode = JSON.parse(
      window.localStorage.getItem('bald_tones_isDark') as string
    );
    if (savedMode === true) {
      document.body.classList.add('dark');
      setIsDark(true);
    } else {
      document.body.classList.remove('dark');
      setIsDark(false);
    }
  }, []);
  React.useEffect(() => {
    setLocalStorage('bald_tones_isDark', JSON.stringify(isDark));
  }, [isDark]);
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
    setCurrentScale(SCALES[scaleName]);
  }, [scaleName]);
  React.useEffect(() => {
    if (loop.current) {
      loop.current.dispose();
    }
    loop.current = new Tone.Sequence(
      (time, beat) => {
        setCurrentBeat(beat);
        // Adjust the volume per the number of notes
        const normalized = normalizeVolume({
          totalNotes: 16,
          activeNotes: noteMap[beat].length,
        });
        const vol = normalized * (1 - currentVol);
        synth.volume.setValueAtTime(vol, time);
        synth.triggerAttackRelease(noteMap[beat], '16n', time);
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      '16n'
    ).start(0);
  }, [noteMap, isPlaying, currentVol]);
  const togglePlay = React.useCallback(() => {
    Tone.context.resume();
    Tone.Transport.toggle();
    setIsPlaying(isPlaying => !isPlaying);
  }, []);
  return (
    <>
      <WaveForm waveform={oscillator} />
      <GitHub />
      <ColorModeButton isDark={isDark} setIsDark={setIsDark} />
      <Wrapper>
        <div className="grid-area">
          <h1>Pentatonic Sequencer</h1>
          <PlaybackButtons
            isMobile
            isPlaying={isPlaying}
            reset={reset}
            togglePlay={togglePlay}
          />
          <ScaleGrid
            tick={tick}
            scale={currentScale}
            isPlaying={isPlaying}
            noteMatrix={noteMatrix}
            currentBeat={currentBeat}
          />
          <div className="secondary-ui">
            <Dropdowns
              oscillator={oscillator}
              scaleName={scaleName}
              setOscillator={setOscillator}
              setScaleName={setScaleName}
            />
            <div className="buttons">
              <SliderControls
                isMobile
                currentBPM={currentBPM}
                currentVol={currentVol}
                setCurrentVol={setCurrentVol}
                setCurrentBPM={setCurrentBPM}
              />
              <DataButtons openModal={openModal} />
            </div>
          </div>
        </div>
        <div className="primary-ui">
          <PlaybackButtons
            isPlaying={isPlaying}
            reset={reset}
            togglePlay={togglePlay}
          />
          <SliderControls
            currentBPM={currentBPM}
            currentVol={currentVol}
            setCurrentVol={setCurrentVol}
            setCurrentBPM={setCurrentBPM}
          />
        </div>
      </Wrapper>
      <Modal
        isOpen={modalIsOpen}
        action={modalAction}
        close={() => setModalIsOpen(false)}
        noteMatrix={noteMatrix}
        bpm={currentBPM}
        waveform={oscillator}
        scaleName={scaleName}
        vol={currentVol}
        setCurrentBPM={setCurrentBPM}
        setCurrentVol={setCurrentVol}
        setOscillator={setOscillator}
        setNoteMatrix={setNoteMatrix}
        setScaleName={setScaleName}
      />
      <a
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          color: '#fff',
          textDecoration: 'none',
        }}
        target="_blank"
        href="https://bald.design"
        rel="noreferrer"
      >
        &copy; {new Date().getFullYear()} by <strong>Bumhan Yu</strong>
      </a>
    </>
  );
}

export default App;
