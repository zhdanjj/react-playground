import { BPM } from './BPM';

import styles from './Pads.module.scss';

/**
 * todo:
 * преттиер
 * хранение отмеченных/неотмеченных
 * bpm
 */

export function Pads () {
  return (
    <div className={styles.Pads}>
      <BPM />
      {
        Array.from(Array(4).keys()).map(row => (
          <div className={styles.Pads__row}>
            {
              Array.from(Array(16).keys()).map(column => (
                <div className={styles.Pads__item}>
                  <input type="checkbox" />
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}
