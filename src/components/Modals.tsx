import * as React from 'react';
import styled from 'styled-components';
import { OscillatorType } from '../types/soundTypes';
import { setLocalStorage, localStorageIsAvailable } from '../utils';
const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  padding: 1.2rem;
  background-color: var(--modal-bg);
  transform: translateX(-100vw);
  opacity: 0;
  display: flex;
  align-items: center;
  transition: transform 0.2s, opacity 0.2s;
  &[data-active='true'] {
    transform: translateX(0);
    opacity: 1;
  }
  .dialogue {
    margin: 0 auto;
    width: 100%;
    max-width: 50rem;
    border: 1px solid var(--modal-border);
    background: var(--modal-dialogue);
    border-radius: 1.2rem;
    padding: 3rem 4rem;
    color: var(--modal-text);
    text-transform: uppercase;
    h2 {
      font-size: 2rem;
      margin: 0 0 2.4rem;
      font-weight: bold;
      letter-spacing: 0.53em;
      span {
        opacity: 0;
      }
    }
    label,
    input {
      display: block;
      position: relative;
      width: 100%;
    }
    label {
      font-size: 1.2rem;
      letter-spacing: 0.405em;
      font-weight: 700;
      margin-bottom: 0.6rem;
    }
    input {
      margin-top: 1.2rem;
      border: 1px solid var(--modal-border);
      color: var(--modal-text);
      outline: none;
      font-weight: 400;
      font-size: 1.5rem;
      padding: 0.8rem 1.2rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      background-color: var(--modal-input-bg);
      position: relative;
      &[data-error='true'] {
        border-color: var(--red500);
        box-shadow: 0 1px 10px rgba(255, 0, 0, 0.3);
      }
    }
    span {
      text-transform: none;
      &.error {
        position: absolute;
        top: 0;
        right: 0;
        margin-left: auto;
        display: none;
        letter-spacing: 0.05em;
        color: var(--red500);
      }
      &[data-visible='true'] {
        display: inline-block;
      }
    }
    .buttons {
      margin-top: 2.4rem;
      text-align: right;
    }
    button {
      border-radius: 3rem;
      font-size: 1.2rem;
      font-weight: 700;
      padding: 0.8rem 1.6rem;
      border: none;
      outline: none;
      cursor: pointer;
      &:hover {
        transform: translateY(-1px);
        box-shadow: var(--base-shadow);
      }
      &.save {
        background-color: var(--input-ui);
        color: #fff;
      }
      &.cancel {
        border: 1px solid var(--input-ui);
        color: var(--input-ui);
        background-color: #fff;
      }
      &.open,
      &.delete,
      &.yay,
      &.nay {
        padding: 0.4rem 0.8rem;
        font-size: 1rem;
      }
      &.open {
        background-color: var(--input-ui);
        color: #fff;
      }
      &.delete {
        background-color: var(--trash-btn);
        color: var(--ui-danger);
      }
      &.yay {
        background-color: var(--red700);
        color: #fff;
      }
      &.nay {
        background-color: #fff;
        color: var(--coolGray800);
      }
    }
    button + button {
      margin-left: 1rem;
    }
    .track-list {
      max-height: 400px;
      overflow-y: scroll;
    }
    .track-item {
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      h3 {
        font-size: 1.2rem;
        font-weight: 400;
        margin: 0;
      }
      time {
        font-size: 1rem;
        opacity: 0.7;
      }
      background-color: var(--track-list-bg);
      .buttons {
        margin: 0;
        flex-shrink: 0;
      }
      button + button {
        margin-left: 0.5rem;
      }
      .confirming {
        position: absolute;
        padding: 1rem 1.5rem;
        background: var(--trash-btn);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateY(-3rem);
        opacity: 0;
        pointer-events: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &[data-active='true'] {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        h3 {
          font-weight: 800;
        }
      }
    }
    .track-item + .track-item {
      margin-top: 0.5rem;
    }
    @media screen and (max-width: 680px) {
      padding: 1.2rem 2.4rem;
    }
  }
`;

type DataSetters = {
  setCurrentBPM?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentVol?: React.Dispatch<React.SetStateAction<number>>;
  setOscillator?: React.Dispatch<React.SetStateAction<OscillatorType>>;
  setNoteMatrix?: React.Dispatch<React.SetStateAction<Array<Array<number>>>>;
  setScaleName?: React.Dispatch<React.SetStateAction<string>>;
};

type ModalProps = DataSetters & {
  isOpen?: boolean;
  action?: string;
  close: () => void;
  noteMatrix?: Array<Array<number>>;
  bpm?: number;
  waveform?: OscillatorType;
  vol?: number;
  scaleName?: string;
};
type TrackData = {
  name: string;
  savedAt: string;
  track: Array<Array<number>>;
  deleting: boolean;
  bpm: number;
  waveform: OscillatorType;
  vol: number;
  scaleName: string;
};
const SaveAction: React.FC<ModalProps> = ({
  close,
  noteMatrix,
  bpm = 80,
  waveform = 'sine',
  vol = 1,
  scaleName = '',
}) => {
  const [title, setTitle] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const clear = () => {
    setTitle('');
    setHasError(false);
  };
  const cancel = () => {
    clear();
    close();
  };
  const save = () => {
    if (title.trim() === '') {
      setHasError(true);
      return;
    }
    const latestArr = JSON.parse(
      window.localStorage.getItem('bald_tones') as string
    );
    const newTrack: TrackData = {
      name: title.trim(),
      bpm,
      vol,
      waveform,
      scaleName,
      savedAt:
        new Date().toLocaleDateString() +
        ', ' +
        new Date().toLocaleTimeString(),
      track: noteMatrix!,
      deleting: false,
    };
    setLocalStorage('bald_tones', JSON.stringify([newTrack, ...latestArr]));
    clear();
    close();
  };
  React.useEffect(() => {
    if (title !== '') setHasError(false);
  }, [title]);
  return (
    <div className="dialogue">
      <h2>
        Save as...<span>.</span>
      </h2>
      <label htmlFor="title">
        Track title
        <span className="error" data-visible={hasError}>
          Cannot be empty
        </span>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          data-error={hasError}
          onChange={e => setTitle(e.currentTarget.value)}
        />
      </label>
      <span>Your music will be saved in your browser's local storage.</span>
      <div className="buttons">
        <button className="save" onClick={save}>
          Save
        </button>
        <button className="cancel" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
const LoadAction: React.FC<ModalProps> = ({
  close,
  setCurrentBPM,
  setCurrentVol,
  setOscillator,
  setNoteMatrix,
  setScaleName,
}) => {
  const [trackList, setTrackList] = React.useState<Array<TrackData>>([]);
  const noData = trackList.length === 0;
  const loadLocalData = () => {
    const latestArr: Array<TrackData> = JSON.parse(
      window.localStorage.getItem('bald_tones') as string
    );
    setTrackList(latestArr);
  };
  const cancel = () => {
    loadLocalData();
    close();
  };
  const confirmDeletion = (index: number) => {
    const arr = [...trackList];
    arr.forEach((item, i) => (item.deleting = i === index ? true : false));
    setTrackList(arr);
  };
  const cancelDeletion = (index: number) => {
    const arr = [...trackList];
    arr[index].deleting = false;
    setTrackList(arr);
  };
  const deleteTrack = (index: number) => {
    const arr = [...trackList];
    const updatedArr = arr.filter((item, i) => i !== index);
    setLocalStorage('bald_tones', JSON.stringify([...updatedArr]));
    loadLocalData();
  };
  const openTrack = (index: number) => {
    const item = [...trackList][index];
    const {
      bpm = 80,
      vol = 1,
      waveform = 'sine',
      scaleName = 'major',
      track = [[]],
    } = item;
    setCurrentBPM!(bpm);
    setCurrentVol!(vol);
    setOscillator!(waveform);
    setNoteMatrix!(track);
    setScaleName!(scaleName);
    cancel();
  };
  React.useEffect(() => {
    loadLocalData();
  }, []);

  return (
    <div className="dialogue">
      <h2
        style={{
          marginBottom: noData ? 0 : undefined,
          textAlign: noData ? 'center' : undefined,
        }}
      >
        {noData ? (
          'No saved track'
        ) : (
          <>
            Open a track...<span>.</span>
          </>
        )}
      </h2>
      <div className="track-list">
        {trackList.map((item, i) => (
          <div key={i} className="track-item">
            <div className="info">
              <h3>{item.name}</h3>
              <time dateTime={item.savedAt}>{item.savedAt}</time>
            </div>
            <div className="buttons">
              <button className="open" onClick={() => openTrack(i)}>
                Open
              </button>
              <button className="delete" onClick={() => confirmDeletion(i)}>
                Delete
              </button>
            </div>
            <div className="confirming" data-active={item.deleting}>
              <div>
                <h3>Delete this track?</h3>
              </div>
              <div className="buttons">
                <button className="yay" onClick={() => deleteTrack(i)}>
                  Yes
                </button>
                <button className="nay" onClick={() => cancelDeletion(i)}>
                  No
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className="cancel" onClick={cancel}>
          {trackList.length === 0 ? 'Close' : 'Cancel'}
        </button>
      </div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  action,
  close,
  noteMatrix,
  bpm,
  scaleName,
  waveform,
  vol,
  setCurrentBPM,
  setCurrentVol,
  setOscillator,
  setNoteMatrix,
  setScaleName,
}) => {
  React.useEffect(() => {
    if (!localStorageIsAvailable('bald_tones'))
      setLocalStorage('bald_tones', JSON.stringify([]));
  }, []);
  return (
    <ModalStyle data-active={isOpen}>
      {action === 'save' && (
        <SaveAction
          close={close}
          bpm={bpm}
          scaleName={scaleName}
          waveform={waveform}
          vol={vol}
          noteMatrix={noteMatrix}
        />
      )}
      {action === 'load' && (
        <LoadAction
          close={close}
          setCurrentBPM={setCurrentBPM}
          setCurrentVol={setCurrentVol}
          setOscillator={setOscillator}
          setNoteMatrix={setNoteMatrix}
          setScaleName={setScaleName}
        />
      )}
    </ModalStyle>
  );
};

export default Modal;
