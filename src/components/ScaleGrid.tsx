import * as React from 'react';
import styled from 'styled-components';

const GridStyle = styled.div`
  --gap: 0.5rem;
  border-radius: 0.8rem;
  width: 52.7rem;
  background-color: #fff;
  height: 50.5rem;
  display: flex;
  padding: 1.5rem;
  margin-bottom: 1.3rem;
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
  @media screen and (max-width: 680px) {
    --gap: 0.3rem;
    width: 35rem;
    height: 35rem;
    padding: 0.9rem;
    .beat:first-of-type {
      display: none;
    }
  }
`;

type GridProps = {
  scale: Array<string>;
  noteMatrix: Array<Array<number>>;
  isPlaying: boolean;
  currentBeat: number;
  tick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ScaleGrid: React.FC<GridProps> = ({
  scale,
  noteMatrix,
  isPlaying,
  currentBeat,
  tick,
}) => (
  <GridStyle>
    <div className="beat">
      {scale.map((note, i) => (
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
        {scale.map((note, j) => (
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
);

export default ScaleGrid;
