import { ChangeEvent } from "react"

type Props = {
  bpm: number,
  onChange: (value: number) => void
}

export const DEFAULT_VALUE = 220
const INCREMENT_STEP = 20
const MINIMUM_VALUE = INCREMENT_STEP

export function BPM({bpm, onChange}: Props) {
  return (
    <span className="BPM">
      <label>
        BPM:
        <input
          type="number"
          value={bpm}
          onInput={
            (e: ChangeEvent<HTMLInputElement>) => onChange(
              Math.max(parseInt(e.target.value), MINIMUM_VALUE)
            )
          }
          style={{width: '40px'}}
        />
      </label>
      <button onClick={() => onChange(DEFAULT_VALUE)}>reset</button>
      <button onClick={() => onChange(Math.max(MINIMUM_VALUE, bpm - INCREMENT_STEP))}>
        -{INCREMENT_STEP}
      </button>
      <button onClick={() => onChange(bpm + INCREMENT_STEP)}>
        +{INCREMENT_STEP}
      </button>
    </span>
  )
}
