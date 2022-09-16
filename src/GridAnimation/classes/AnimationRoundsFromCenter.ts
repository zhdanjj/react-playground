import {
  Coordinate,
  Grid,
} from "../types";
import { BaseAnimation } from "./BaseAnimation";

export class AnimationRoundsFromCenter extends BaseAnimation {
  center: Coordinate

  constructor (grid: Grid, setGrid: React.Dispatch<React.SetStateAction<Grid>>) {
    super(grid, setGrid)
    const c = Math.floor(this.a / 2)
    this.center = {row: c, col: c}
    this.makeAnimation()
  }

  makeSquare (size: number): Coordinate[] {
    const half = Math.floor(size / 2)
    const res = []
    const start = this.center.row - half
    const end = this.center.col + half
    for (let row = start; row <= end; row++) {
      if (row === start || row === end) {
        for (let col = start; col <= end; col++) {
          res.push({row, col})
        }
      } else {
        res.push({row, col: this.center.col - half})
        res.push({row, col: this.center.col + half})
      }
    }
    return res
  }

  makeAnimation () {
    for (let size = 1; size <= this.a; size += 2) {
      this.animationList.push(this.makeSquare(size))
    }
  }
}
