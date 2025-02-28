import { useEffect, useState } from "react";
import { Keys } from './components/Keys/Keys';
import { Adsr } from './components/Adsr/Adsr';
import { Echo } from './components/Echo/Echo';
import { Polyphony } from './components/Polyphony/Polyphony';
import { notes } from './utils/notes'
import { keys } from './utils/keys';
import { getDefaultAdsr } from './utils/adsr';
import { getDefaultEcho } from './utils/echo';
import { getDefaultPolyphony } from './utils/polyphony';

// https://www.youtube.com/watch?v=uasGsHf7UYA

// https://marcgg.com/blog/2016/11/01/javascript-audio/

// https://melvingeorge.me/blog/convert-array-into-string-literal-union-type-typescript
const waveTypes = ['sine', 'square', 'sawtooth', 'triangle'] as const;
type WaveTypesType = typeof waveTypes[number];

type PlayingNote = {
  o: OscillatorNode[],
  g: GainNode,
}

const STAGE_MAX_TIME = 3;

let context: AudioContext = {} as AudioContext; // плохо, нужно null по идее
let master: GainNode = {} as GainNode;
let delay: DelayNode = {} as DelayNode;
let feedback: GainNode = {} as GainNode;

export function Piano () {
  const [waveType, setWaveType] = useState<WaveTypesType>(waveTypes[0])
  const [octave, setOctave] = useState<number>(4)
  const [adsr, setAdsr] = useState(getDefaultAdsr());
  const [playingNotes] = useState({} as {[k: string]: PlayingNote})
  const [echo, setEcho] = useState(getDefaultEcho())
  const [polyphony, setPolyphony] = useState(getDefaultPolyphony)

  const startIdx = octave * 12 - 3;
  const visibleNotes: [string, number, string][] = notes
    .slice(startIdx, startIdx + 18)
    .map((v, i) => [...v, keys[i]])

  useEffect(() => {
    context = new AudioContext();
    master = context.createGain();
    delay = context.createDelay();
    feedback = context.createGain();

    master.connect(context.destination);
    master.connect(delay);

    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(context.destination);

    feedback.gain.setValueAtTime(0, context.currentTime);

    return () => {
      context.close();
    }
  }, [])

  useEffect(() => {
    const isOn = echo.enabled;
    const end = context.currentTime + .1;

    feedback.gain.linearRampToValueAtTime(isOn ? echo.feedback : 0, end);
    delay.delayTime.linearRampToValueAtTime(isOn ? echo.duration : 0, end);
  }, [echo])

  function createOscillator(freq: number, detune: number) {
    const o = context.createOscillator()
    o.type = waveType
    o.detune.value = detune;
    o.frequency.value = freq

    o.start(context.currentTime)

    return o;
  }

  function createNote(freq: number) {
    const g = context.createGain()

    const o = []

    for (let i = 0; i < polyphony.oscillatorsCount; i++) {
      const step = Math.floor(i / 2);
      const detune = polyphony.detune * step * (i % 2 === 0 ? 1 : -1);
      const osc = createOscillator(freq, detune);
      osc.connect(g);
      o.push(osc)
    } 

    const now = context.currentTime;
    const atkDuration = adsr.attack * STAGE_MAX_TIME;
    const atkEndTime = now + atkDuration;
    const decayDuration = adsr.decay * STAGE_MAX_TIME;

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(1, atkEndTime);
    g.gain.setTargetAtTime(adsr.sustain, atkEndTime, decayDuration);

    g.connect(master)

    return { o, g };
  }

  function noteOn(note: string) {
    console.log('noteOn', note, context.currentTime)
    const freq = notes.find(v => v[0] === note)![1]
    playingNotes[note] = createNote(freq);
  }

  function noteOff(note: string) {
    console.log('noteOff', note, context.currentTime)
    const playingNote = playingNotes[note];
    const { g } = playingNote;
    // g.gain.cancelScheduledValues(context.currentTime)

    const now = context.currentTime;
    const relDuration = adsr.release * STAGE_MAX_TIME;
    const relEndTime = now + relDuration + .001;

    // когда плавно выключаем ноту в разных обработчиках почему-то происходит щелчок
    // чтобы избежать, заново устанавливать текущее значение
    // https://stackoverflow.com/a/34480323 (ответ всё ещё не до конца проясняет причину)
    g.gain.setValueAtTime(g.gain.value, context.currentTime)
    g.gain.linearRampToValueAtTime(0, relEndTime);
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

      <div className="Controls" style={{display: 'flex'}}>
        <Adsr adsr={adsr} onChange={(adsr) => {setAdsr(adsr)}}></Adsr>
        <Echo echo={echo} onChange={(echo) => {setEcho(echo)}}></Echo>
        <Polyphony polyphony={polyphony} onChange={(polyphony) => {setPolyphony(polyphony)}}></Polyphony>
      </div>
    </div>
  );
}
