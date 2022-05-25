import { useEffect, useState } from 'react';
import styles from './Theremin.module.scss';
import classnames from 'classnames';

export function Theremin () {
  const [currentFrequency, setCurrentFrequency] = useState(10)

  const MIN = 80
  const MAX = 4000

  let context: AudioContext = {} as AudioContext;

  function onMouseEnter (event) {

  }

  function onMouseLeave (event) {
    setCurrentFrequency(0)
  }

  function onMouseMove (event) {
    setCurrentFrequency(event.clientX)
  }

  return (
    <div className={styles.Theremin}>
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
    </div>
  );
}
