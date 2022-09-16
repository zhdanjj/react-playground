import {
  Coordinate,
  Grid,
} from "../types";

export class BaseAnimation {
  grid: Grid
  setGrid: React.Dispatch<React.SetStateAction<Grid>>
  a: number
  animationList: Coordinate[][] = []
  interval = -1
  delay = 150
  loopDelay = 1500

  constructor (grid: Grid, setGrid: React.Dispatch<React.SetStateAction<Grid>>) {
    this.grid = grid
    this.setGrid = setGrid
    this.a = grid[0].length
  }

  animatePart (cells: Coordinate[]) {
    return new Promise((resolve) => {
      for (let c of cells) {
        this.grid[c.row][c.col].open = !this.grid[c.row][c.col].open
      }
      this.setGrid([...this.grid])
      setTimeout(() => { resolve(null) }, this.delay)
    })
  }

  async animate () {
    for (let cells of this.animationList) {
      await this.animatePart(cells)
    }
  }

  toggle () {
    this.animate()
  }

  start () {
    this.animate()
    this.interval = window.setInterval(() => {
      this.animate()
    }, this.loopDelay)
  }

  stop () {
    clearInterval(this.interval)
  }
}