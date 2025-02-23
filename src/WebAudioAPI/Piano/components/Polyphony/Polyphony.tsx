import type { IPolyphony } from '../../utils/polyphony';

type Props = {
  polyphony: IPolyphony,
  onChange: (polyphony: IPolyphony) => void,
}

export function Polyphony({ polyphony, onChange }: Props) {
  return (
    <fieldset style={{marginTop: '20px', width: '200px'}}>
      <legend>Polyphony</legend>
      <label>
        <span className="label" style={{display: 'block'}}>
          oscillators count [{polyphony.oscillatorsCount}]
        </span>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={polyphony.oscillatorsCount}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...polyphony, oscillatorsCount: +e.target.value})
            }
          }
        />
      </label>
      <label>
        <span className="label" style={{display: 'block'}}>
          detune [{polyphony.detune}]
        </span>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={polyphony.detune}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...polyphony, detune: +e.target.value})
            }
          }
        />
      </label>
    </fieldset>
  )
}