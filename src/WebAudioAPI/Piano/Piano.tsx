import { useEffect, useState } from "react";

// https://marcgg.com/blog/2016/11/01/javascript-audio/

// https://melvingeorge.me/blog/convert-array-into-string-literal-union-type-typescript
const waveTypes = ['sine', 'square', 'sawtooth', 'triangle'] as const;
type WaveTypesType = typeof waveTypes[number];

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// https://gist.github.com/marcgg/94e97def0e8694f906443ed5262e9cbb?permalink_comment_id=3896533#gistcomment-3896533
// Правда значения на доли отличаются от тех, что в таблице
function getPitch(note: string, octave: number) {
  // ("A", 4) => 440
  // multiply by 2^(1/12) N times to get N steps higher
  var step = NOTES.indexOf(note);
  var power = Math.pow(2, (octave * 12 + step - 57) / 12);
  var pitch = 440 * power;
  return pitch;
}

export function Piano () {
  const [waveType, setWaveType] = useState<WaveTypesType>(waveTypes[0])
  const [octave, setOctave] = useState<number>(4)

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
      <div className="notes">{
        NOTES.map(
          note => (
            <button
              key={note}
              onClick={() => playNote(getPitch(note, octave))}
            >
              {note}
            </button>
          )
        )
      }</div>
    </div>
  );
}
