export type Cell = {
  open: Boolean,
}

export type Grid = Cell[][]

export type Coordinate = {
  row: number,
  col: number,
}

export type Animation = Coordinate[][]