import { useEffect, useState } from 'react'
import { CGrid } from './components/Grid/Grid'
import { makeGrid } from './utils'
import { BaseAnimation } from './classes/BaseAnimation'
import { Grid } from './types'

type GridAnimationProps = {
  animation?: new (grid: Grid, setGrid: React.Dispatch<React.SetStateAction<Grid>>) => BaseAnimation,
}

export function GridAnimation (props: GridAnimationProps) {
  const a = 21
  const [grid, setGrid] = useState(makeGrid(a, a))
  const [running, setRunning] = useState(false)

  function onCellClick (row: number, col: number) {
    // grid[row][col].open = !grid[row][col].open
    // setGrid([...grid])
  }

  let animation: BaseAnimation

  if (props.animation) {
    animation = new props.animation(grid, setGrid)
  }

  useEffect(() => {
    if (animation && running) {
      animation.start()
      return function cleanup () {
        animation.stop()
      }
    }
  }, [running])

  return (
    <>
      <div style={{marginBottom: '20px'}}>
        {
          props.animation
            && running
              && <button onClick={() => { setRunning(false) }}>stop</button>
              || (
                <>
                  <button onClick={() => { animation && animation.toggle() }}>toggle</button>
                  <b style={{margin: '4px'}} />
                  <button onClick={() => { setRunning(true) }}>run</button>
                </>
              )
        }
      </div>
      <CGrid
        grid={grid}
        onCellClick={onCellClick}
      />
    </>
  )
}
