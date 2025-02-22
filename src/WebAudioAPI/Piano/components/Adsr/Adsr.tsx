import type { ADSR } from '../../utils/adsr'

type Props = {
  adsr: ADSR,
  onChange: (adsr: ADSR) => void,
}

const STEP = .01;

export function Adsr({ adsr, onChange }: Props) {
  return (
    <fieldset style={{marginTop: '20px', width: '200px'}}>
      <legend>ADSR</legend>
      <label>
        <span className="label" style={{display: 'block'}}>
          attack [{adsr.attack}]
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step={STEP}
          value={adsr.attack}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...adsr, attack: +e.target.value})
            }
          }
        />
      </label>
      <label>
        <span className="label" style={{display: 'block'}}>
          decay [{adsr.decay}]
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step={STEP}
          value={adsr.decay}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...adsr, decay: +e.target.value})
            }
          }
        />
      </label>
      <label>
        <span className="label" style={{display: 'block'}}>
          sustain [{adsr.sustain}]
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step={STEP}
          value={adsr.sustain}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...adsr, sustain: +e.target.value})
            }
          }
        />
      </label>
      <label>
        <span className="label" style={{display: 'block'}}>
          release [{adsr.release}]
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step={STEP}
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