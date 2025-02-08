import { useEffect, useState } from 'react';
import { BPM, DEFAULT_VALUE as defaultBpm } from './components/BPM';
import { Tracks } from './components/Tracks/Tracks';
import { Controls } from './components/Controls/Controls';
import { useInstruments } from './hooks/use-instruments';
import { trackMock } from './mocks/track';

import styles from './Pads.module.scss';

type PlayingState = 'playing' | 'stopped'

export function Pads () {
  const [bpm, setBpm] = useState(defaultBpm);
  const [track, setTrack] = useState(trackMock);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [state, setState] = useState<PlayingState>('stopped')
  const instruments = useInstruments(track)

  useEffect(() => {
    const interval = setTimeout(() => {
      if (state !== 'playing') return;
      instruments.playAt(currentIndex);
      const next = currentIndex + 1
      setCurrentIndex(next === track[0].length ? 0 : next)
    }, 1e3 * 60 / (bpm * 2))

    return () => {
      clearInterval(interval)
    }
  }, [currentIndex, state])

  function onStateChange(v: PlayingState) {
    setState(v)
    if (v === 'playing') {
      setCurrentIndex(0)
    }
    if (v === 'stopped') {
      setCurrentIndex(-1)
    }
  }

  return (
    <div className={styles.Pads}>
      <BPM bpm={bpm} onChange={(v) => {setBpm(v)}} />
      <Controls onChange={(v) => onStateChange(v)} />

      <Tracks
        currentIndex={currentIndex}
        model={track}
        onChange={(v) => {setTrack(v)}}
      />
    </div>
  );
}
