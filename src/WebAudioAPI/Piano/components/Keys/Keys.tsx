import classnames from 'classnames';
import s from './Keys.module.scss';

type Props = {
  notes: [string, number, string][],
  onPress: (note: [string, number, string]) => void,
  onOff: (note: [string, number, string]) => void,
}

const isBlack = (note: string) => 
  ['C#', 'D#', 'F#', 'G#', 'A#'].some(v => note.includes(v))

export function Keys({ notes, onPress, onOff }: Props) {
  return (
    <div className={s.Keys}>
      {
        notes.map((note) => (
          <button
            className={classnames({
              [s.Keys__item]: true,
              [s.Keys__item_black]: isBlack(note[0]),
            })}
            key={note[0]}
            onMouseDown={() => onPress(note)}
            onMouseUp={() => onOff(note)}
          >
            <span className={s.Keys__labels}>
            <span className={s.Keys__note}>{note[0]}</span>
            <span className={s.Keys__key}>{note[2]}</span>
            </span>
          </button>
        ))
      }
    </div>
  )
}
