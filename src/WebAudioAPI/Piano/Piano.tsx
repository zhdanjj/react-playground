import { useEffect, useState } from "react";
import { Keys } from './components/Keys/Keys';
import { notes } from './utils/notes'

// https://marcgg.com/blog/2016/11/01/javascript-audio/

// https://melvingeorge.me/blog/convert-array-into-string-literal-union-type-typescript
const waveTypes = ['sine', 'square', 'sawtooth', 'triangle'] as const;
type WaveTypesType = typeof waveTypes[number];

export function Piano () {
  const [waveType, setWaveType] = useState<WaveTypesType>(waveTypes[0])
  const [octave, setOctave] = useState<number>(4)

  const startIdx = octave * 12 - 7;
  const visibleNotes = notes.slice(startIdx, startIdx + 24);

  let context: AudioContext = {} as AudioContext;

  useEffect(() => {
    context = new AudioContext();

    return () => {
      context.close();
    }
  })

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

  function onOctaveChange (event: any) {
    const next = parseInt(event.target.value);
    if (next >= 1 && next <= 10) {
      setOctave(next)
    }
  }

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
          onPress={pitch => playNote(pitch)}
        ></Keys>
      </div>
    </div>
  );
}
