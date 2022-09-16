import type {
  Grid
} from '../../types'
import styles from './Grid.module.scss';
import classnames from 'classnames';

type GridProps = {
  grid: Grid,
  onCellClick?: (row: number, column: number) => void,
}

export function CGrid (props: GridProps) {
  const width = props.grid[0].length
  const style = {
    '--width': width
  }

  return (
    <div className={styles.Grid} style={style as React.CSSProperties}>
      {
        props.grid.map((row, i) => row.map((cell, j) => {
          return (
            <div
              key={i + '' + j}
              className={classnames({
                [styles.GridCell]: true,
                [styles.GridCell_open]: cell.open,
              })}
              onClick={() => { props.onCellClick && props.onCellClick(i, j) }}
            />
          )
        }))
      }
    </div>
  )
}