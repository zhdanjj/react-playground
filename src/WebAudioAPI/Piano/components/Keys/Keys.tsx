import classnames from 'classnames';
import s from './Keys.module.scss';

type Props = {
  notes: [string, number][],
  onPress: (pitch: number) => void,
}

const isBlack = (note: string) => 
  ['C#', 'D#', 'F#', 'G#', 'A#'].some(v => note.includes(v))

export function Keys({ notes, onPress }: Props) {
  return (
    <div className={s.Keys}>
      {
        notes.map(([note, pitch]) => (
          <button
            className={classnames({
              [s.Keys__item]: true,
              [s.Keys__item_black]: isBlack(note),
            })}
            key={note}
            onMouseDown={() => onPress(pitch)}
          >
            <span className={s.Keys__label}>{note}</span>
          </button>
        ))
      }
    </div>
  )
}
