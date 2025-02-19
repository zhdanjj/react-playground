import type { ADSR } from '../../utils/adsr'

type Props = {
  adsr: ADSR,
  onChange: (adsr: ADSR) => void,
}

export function Adsr({ adsr, onChange }: Props) {
  return (
    <fieldset style={{marginTop: '20px', width: '200px'}}>
      <legend>ADSR</legend>
      <label>
        attack
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={adsr.attack}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...adsr, attack: +e.target.value})
            }
          }
        />
      </label>
      <label>
        decay
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={adsr.decay}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...adsr, decay: +e.target.value})
            }
          }
        />
      </label>
      <label>
        sustain
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={adsr.sustain}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...adsr, sustain: +e.target.value})
            }
          }
        />
      </label>
      <label>
        release
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={adsr.release}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...adsr, release: +e.target.value})
            }
          }
        />
      </label>
    </fieldset>
  )
}