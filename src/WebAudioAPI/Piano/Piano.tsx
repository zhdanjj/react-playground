import { KeyboardEventHandler, useEffect, useState } from "react";
import { Keys } from './components/Keys/Keys';
import { notes } from './utils/notes'
import { keys } from './utils/keys';

// https://marcgg.com/blog/2016/11/01/javascript-audio/

// https://melvingeorge.me/blog/convert-array-into-string-literal-union-type-typescript
const waveTypes = ['sine', 'square', 'sawtooth', 'triangle'] as const;
type WaveTypesType = typeof waveTypes[number];

export function Piano () {
  const [waveType, setWaveType] = useState<WaveTypesType>(waveTypes[0])
  const [octave, setOctave] = useState<number>(4)

  const startIdx = octave * 12 - 3;
  const visibleNotes: [string, number, string][] = notes
    .slice(startIdx, startIdx + 18)
    .map((v, i) => [...v, keys[i]])

  let context: AudioContext = {} as AudioContext;

  useEffect(() => {
    context = new AudioContext();

    return () => {
      context.close();
    }
  })

  function createOscillator(freq: number, detune: number) {
    const o = context.createOscillator()
    const g = context.createGain()
    o.type = waveType
    o.detune.value = detune;
    o.connect(g)
    o.frequency.value = freq
    g.connect(context.destination)
    o.start(0)

    g.gain.exponentialRampToValueAtTime(
      0.00001, context.currentTime + 3
    )
  }

  function noteOn(frequency: number) {
    const detune = 0;
    createOscillator(frequency, 0)
    // createOscillator(frequency, -detune)
    // createOscillator(frequency, detune)
  }

  function noteOff() {

  }

  function onOctaveChange (event: any) {
    const next = parseInt(event.target.value);
    if (next >= 1 && next <= 10) {
      setOctave(next)
    }
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const k = event.key;
    if (keys.includes(k)) {
      event.preventDefault();
      const note = visibleNotes[keys.indexOf(k)]
      console.log('noteOn', note)
      noteOn(note![1])
    }
  }

  return (
    <div onKeyDown={onKeyDown}>
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
      <div style={{marginBottom: '8px'}}>
        <label>
          octave
          <input
            type="number"
            value={octave}
            onChange={onOctaveChange}
          />
        </label>
      </div>
      <div className="notes">
        <Keys
          notes={visibleNotes}
          onPress={pitch => noteOn(pitch)}
          onOff={() => noteOff()}
        ></Keys>
      </div>
    </div>
  );
}
