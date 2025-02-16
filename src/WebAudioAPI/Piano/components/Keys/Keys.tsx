import classnames from 'classnames';
import s from './Keys.module.scss';

type Props = {
  notes: [string, number, string][],
  onPress: (pitch: number) => void,
  onOff: () => void,
}

const isBlack = (note: string) => 
  ['C#', 'D#', 'F#', 'G#', 'A#'].some(v => note.includes(v))

export function Keys({ notes, onPress, onOff }: Props) {
  return (
    <div className={s.Keys}>
      {
        notes.map(([note, pitch, key]) => (
          <button
            className={classnames({
              [s.Keys__item]: true,
              [s.Keys__item_black]: isBlack(note),
            })}
            key={note}
            onMouseDown={() => onPress(pitch)}
            onMouseUp={() => onOff()}
          >
            <span className={s.Keys__labels}>
            <span className={s.Keys__note}>{note}</span>
            <span className={s.Keys__key}>{key}</span>
            </span>
          </button>
        ))
      }
    </div>
  )
}
