import {
  // Cell,
  Grid,
} from './types'

export function makeGrid (width=9, height=9): Grid {
  const grid: Grid = []
  for (let h = 0; h < height; h++) {
    const row = []
    for (let w = 0; w < width; w++) {
      row.push({
        open: false,
      })
    }
    grid.push(row)
  }
  return grid
}