import type { IEcho } from '../../utils/echo';

type Props = {
  echo: IEcho,
  onChange: (echo: IEcho) => void,
}

const STEP = .2;

export function Echo({ echo, onChange }: Props) {
  return (
    <fieldset style={{marginTop: '20px', width: '200px'}}>
      <legend>Echo</legend>
      <label>
        <span className="label" style={{display: 'block'}}>
          enabled
        </span>
        <input
          type="checkbox"
          checked={echo.enabled}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...echo, enabled: e.target.checked})
            }
          }
        />
      </label>
      <label>
        <span className="label" style={{display: 'block'}}>
          duration [{echo.duration}]
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step={STEP}
          value={echo.duration}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...echo, duration: +e.target.value})
            }
          }
        />
      </label>
      <label>
        <span className="label" style={{display: 'block'}}>
          feedback [{echo.feedback}]
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step={STEP}
          value={echo.feedback}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({...echo, feedback: +e.target.value})
            }
          }
        />
      </label>
    </fieldset>
  )
}