import {
  Coordinate,
  Grid,
} from "../types";
import { BaseAnimation } from "./BaseAnimation";

export class AnimationRunningLine extends BaseAnimation {
  delay = 1
  loopDelay = 3e3

  constructor (grid: Grid, setGrid: React.Dispatch<React.SetStateAction<Grid>>) {
    super(grid, setGrid)
    this.makeAnimation()
  }

  makeAnimation () {
    const p = (row: number, col: number) => {
      this.animationList.push([{row, col}])
    }

    const pushSquare = (offset: number) => {
      // right
      for (let col = offset; col < this.a - offset - 1; col++) {
        p(offset, col)
      }
      // down
      for (let row = offset; row < this.a - offset - 1; row++) {
        p(row, this.a - offset - 1)
      }
      // left
      for (let col = this.a - offset - 1; col > offset; col--) {
        p(this.a - offset - 1, col)
      }
      // up
      for (let row = this.a - offset - 1; row > offset; row--) {
        p(row, offset)
      }
    }

    const half = Math.floor(this.a / 2)

    for (let i = 0; i < half + 1; i++) {
      pushSquare(i)
    }
    p(half, half)
  }
}
