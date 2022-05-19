import { useEffect, useState } from "react";

// https://marcgg.com/blog/2016/11/01/javascript-audio/

// https://melvingeorge.me/blog/convert-array-into-string-literal-union-type-typescript
const waveTypes = ['sine', 'square', 'sawtooth', 'triangle'] as const;
type WaveTypesType = typeof waveTypes[number];

const notes = [
  ['c',  261.6],
  ['c#', 277.2],
  ['d',  293.7],
  ['d#', 311.1],
  ['e',  329.6],
  ['f',  349.2],
  ['f#', 370.0],
  ['g',  392.0],
  ['g#', 415.3],
  ['a',  440.0],
  ['a#', 466.2],
  ['b4',  493.9],
];

export function Piano () {
  const [waveType, setWaveType] = useState<WaveTypesType>(waveTypes[0])

  const context: AudioContext = new AudioContext();
  
  function playNote (frequency: number) {
    const o = context.createOscillator()
    const g = context.createGain()
    o.type = waveType
    o.connect(g)
    o.frequency.value = frequency
    g.connect(context.destination)
    o.start(0)
  
    g.gain.exponentialRampToValueAtTime(
      0.00001, context.currentTime + 1
    )
  }

  // TODO: наверно стоит перенести создание AudioContext в useEffect
  // и выгружать его после размонтирования

  return (
    <div>
      <div style={{marginBottom: '8px'}}>{
        waveTypes.map(
          t => (
            <label key={t} style={{marginRight: '8px'}}>
              {t}
              <input
                type="radio"
                name="waveType"
                value={t}
                checked={t === waveType}
                onChange={event => setWaveType(event.target.value as WaveTypesType)}
              />
            </label>
          )
        )
      }</div>
      <div className="notes">{
        notes.map(
          note => <button key={note[1]} onClick={() => playNote(note[1] as number)}>
            {note[0]}
          </button>
        )
      }</div>
    </div>
  );
}
