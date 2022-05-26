import { MouseEvent, useState } from 'react';
import styles from './Theremin.module.scss';
import classnames from 'classnames';

let context: AudioContext = {} as AudioContext;
let oscilator: OscillatorNode = {} as OscillatorNode;

export function Theremin () {
  const [currentFrequency, setCurrentFrequency] = useState(0)
  const [wasUserGesture, setWasUserGesture] = useState(true)

  const MIN = 80
  const MAX = 2000

  function onMouseEnter (event: MouseEvent<HTMLDivElement>) {
    context = new AudioContext()
    oscilator = context.createOscillator()
    oscilator.type = 'sine'
    oscilator.connect(context.destination)
    oscilator.frequency.value = currentFrequency
    oscilator.start()

    if (context.state === 'suspended') {
      setWasUserGesture(false)
    }
  }

  function onMouseLeave (event: MouseEvent<HTMLDivElement>) {
    setCurrentFrequency(0)
    context.close()
  }

  function onMouseMove (event: MouseEvent<HTMLDivElement>) {
    const rect = (event.target as HTMLDivElement).getBoundingClientRect()
    const left = event.pageX - rect.left
    const percent = left / rect.width
    const range = MAX - MIN
    const current = range * percent + MIN
    const next = Math.round(current)
    setCurrentFrequency(next)
    oscilator.frequency.value = next
  }

  return (
    <div className={styles.Theremin}>
      {
        // Обход https://developer.chrome.com/blog/autoplay/#web-audio
        wasUserGesture &&
          <>
            <div className={styles.Theremin__labelsLine}>
              <div className={classnames(styles.Theremin__label, styles.Theremin__labelMin)}>{MIN} Hz</div>
              <div className={classnames(styles.Theremin__label, styles.Theremin__labelCurrent)}>
                { currentFrequency > 0 && `${currentFrequency} Hz` }
              </div>
              <div className={classnames(styles.Theremin__label, styles.Theremin__labelMax)}>{MAX} Hz</div>
            </div>
            <div
              className={styles.Theremin__area}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onMouseMove={onMouseMove}
            />
          </>
          ||
          <button onClick={() => setWasUserGesture(true)}>
            click here to start
          </button>
      }
    </div>
  );
}
