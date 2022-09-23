import * as React from 'react';
import styled from 'styled-components';
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
    }
    button + button {
      margin-left: 1rem;
    }
    @media screen and (max-width: 680px) {
      padding: 1.2rem 2.4rem;
    }
  }
`;
type ModalProps = {
  isOpen?: boolean;
  action?: string;
  close: () => void;
  noteMatrix?: Array<Array<number>>;
};
const SaveAction: React.FC<ModalProps> = ({ close, noteMatrix }) => {
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
    if (title === '') {
      setHasError(true);
      return;
    }
    const latestArr = JSON.parse(
      window.localStorage.getItem('bald_tones') as string
    );
    const newTrack = {
      name: title,
      track: noteMatrix,
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
          onChange={e => setTitle(e.currentTarget.value.trim())}
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
const Modal: React.FC<ModalProps> = ({ isOpen, action, close, noteMatrix }) => {
  React.useEffect(() => {
    if (!localStorageIsAvailable('bald_tones'))
      setLocalStorage('bald_tones', JSON.stringify([]));
  }, []);
  return (
    <ModalStyle data-active={isOpen}>
      {action === 'save' && (
        <SaveAction close={close} noteMatrix={noteMatrix} />
      )}
    </ModalStyle>
  );
};

export default Modal;
