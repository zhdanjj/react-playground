type Props = {
  onChange: (v: 'playing' | 'stopped') => void
}

export function Controls({onChange}: Props) {
  return (
    <>
      <button onMouseDown={() => onChange('playing')} style={{marginLeft: '16px'}}>play</button>
      <button onClick={() => onChange('stopped')}>stop</button>
    </>
  ) 
}