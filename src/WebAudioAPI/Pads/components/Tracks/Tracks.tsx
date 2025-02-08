import styles from './Tracks.module.scss'
import classNames from 'classnames';

type Props = {
  currentIndex: number,
  model: number[][],
  onChange: (v: number[][]) => void,
}

export function Tracks({currentIndex, model, onChange} : Props) {

  function onClick(row: number, column: number, value: boolean) {
    const clone = model.map(v => [...v])
    clone[row][column] = value ? 1 : 0
    onChange(clone)
  }
  
  return (
    <div className={styles.Tracks}>
      {
        model.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.Tracks__row}>
            {
              row.map((column, columnIdx) => (
                <div key={columnIdx} className={
                  classNames({
                    [styles.Tracks__item]: true,
                    [styles.Tracks__item_active]: columnIdx === currentIndex,
                    [styles.Tracks__item_checked]: !!column
                  })
                } onClick={() => onClick(rowIdx, columnIdx, !column)} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}