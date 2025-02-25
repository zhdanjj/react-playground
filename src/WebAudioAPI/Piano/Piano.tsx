import { useEffect, useState } from "react";
import { Keys } from './components/Keys/Keys';
import { Adsr } from './components/Adsr/Adsr';
import { notes } from './utils/notes'
import { keys } from './utils/keys';
import { getDefaultAdsr } from './utils/adsr';

// https://www.youtube.com/watch?v=uasGsHf7UYA

// https://marcgg.com/blog/2016/11/01/javascript-audio/

// https://melvingeorge.me/blog/convert-array-into-string-literal-union-type-typescript
const waveTypes = ['sine', 'square', 'sawtooth', 'triangle'] as const;
type WaveTypesType = typeof waveTypes[number];

type PlayingNote = {
  o: OscillatorNode,
  g: GainNode,
}

const STAGE_MAX_TIME = 3;

let context: AudioContext = {} as AudioContext; // плохо, нужно null по идее

export function Piano () {
  const [waveType, setWaveType] = useState<WaveTypesType>(waveTypes[0])
  const [octave, setOctave] = useState<number>(4)
  const [adsr, setAdsr] = useState(getDefaultAdsr());
  const [playingNotes] = useState({} as {[k: string]: PlayingNote})

  const startIdx = octave * 12 - 3;
  const visibleNotes: [string, number, string][] = notes
    .slice(startIdx, startIdx + 18)
    .map((v, i) => [...v, keys[i]])

  useEffect(() => {
    context = new AudioContext();

    return () => {
      context.close();
    }
  }, [])

  function createOscillator(freq: number, detune: number) {
    const o = context.createOscillator()
    const g = context.createGain()
    o.type = waveType
    // o.detune.value = detune;
    o.frequency.value = freq
    o.connect(g)
    g.connect(context.destination)

    o.start(context.currentTime)

    const now = context.currentTime;
    const atkDuration = adsr.attack * STAGE_MAX_TIME;
    const atkEndTime = now + atkDuration;
    const decayDuration = adsr.decay * STAGE_MAX_TIME;

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(1, atkEndTime);
    g.gain.setTargetAtTime(adsr.sustain, atkEndTime, decayDuration);

    return { o, g };
  }

  function noteOn(note: string) {
    console.log('noteOn', note, context.currentTime)
    const freq = notes.find(v => v[0] === note)![1]
    const detune = 0;
    playingNotes[note] = createOscillator(freq, detune);
    // createOscillator(frequency, -detune)
    // createOscillator(frequency, detune)
  }

  function noteOff(note: string) {
    console.log('noteOff', note, context.currentTime)
    const playingNote = playingNotes[note];
    const { g } = playingNote;
    g.gain.cancelScheduledValues(context.currentTime)

    const now = context.currentTime;
    const relDuration = adsr.release * STAGE_MAX_TIME;
    const relEndTime = now + relDuration + .001;

    // когда плавно выключаем ноту в разных обработчиках почему-то происходит щелчок
    // чтобы избежать, заново устанавливать текущее значение
    // https://stackoverflow.com/a/34480323 (ответ всё ещё не до конца проясняет причину)
    g.gain.setValueAtTime(g.gain.value, context.currentTime)
    g.gain.linearRampToValueAtTime(0, relEndTime);

    setTimeout(() => {
      playingNote.o.disconnect();
      playingNote.g.disconnect();
    }, STAGE_MAX_TIME * 1e3);
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
      event.stopPropagation();
      const note = visibleNotes[keys.indexOf(k)]
      console.log('noteOn', note)
      noteOn(note![0])
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
          onPress={note => noteOn(note[0])}
          onOff={(note) => noteOff(note[0])}
        ></Keys>
      </div>

      <Adsr adsr={adsr} onChange={(adsr) => {setAdsr(adsr)}}></Adsr>
    </div>
  );
}
