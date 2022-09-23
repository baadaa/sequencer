import * as Tone from 'tone';
const filter = new Tone.Filter({
  frequency: 1100,
  rolloff: -12,
}).toDestination();

export const synth = new Tone.PolySynth().connect(filter).set({
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1,
  },
});

export const playSingleNote = (note = '') =>
  synth.triggerAttackRelease(note, '16n');
