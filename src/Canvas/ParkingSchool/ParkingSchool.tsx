import { useEffect, useRef, useState } from 'react'
import styles from './Controls.module.scss'

let canvas = {} as HTMLCanvasElement
let ctx = {} as CanvasRenderingContext2D

function paintPath (angle: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillRect(10, 180, 50, 20)
  ctx.fillRect(10, 280, 50, 20)

  ctx.beginPath()
  ctx.moveTo(60, 190)
  ctx.bezierCurveTo(215, 190, 215, 190, 490, 190 - angle * 10)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(60, 290)
  ctx.bezierCurveTo(215, 290, 215, 290, 490, 290 - angle * 10)
  ctx.stroke()
}

export function ParkingSchool () {
  const root = useRef<HTMLDivElement>(null)
  const [steer, setSteer] = useState(0)

  useEffect(() => {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = 500
    canvas.height = 500
    canvas.className = styles.Game__canvas

    if (root.current !== null) {
      root.current.appendChild(canvas)
    }
  }, [])

  useEffect(() => {
    paintPath(steer)
  }, [steer])

  return (
    <div className={styles.Game} ref={root}>
      <label className={styles.Game__steer}>
        Steer
        <input
          type="range"
          min={ -20 }
          max={ 20 }
          value={ steer }
          onChange={
            event => setSteer(parseInt(event.target.value))
          }
        />
      </label>
    </div>
  )
}