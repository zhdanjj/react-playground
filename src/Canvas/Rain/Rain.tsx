import { useEffect } from "react"
import { rAF, cAF } from "./utils"

/*
Идея
https://codepen.io/ruigewaard/pen/Podmea
но с requestAnimationFrame вместо setInterval
*/

const VIEWPORT_OFFSET = 32
const MAX_PARTICLES = 500
const BACKGROUND = 'rgb(0, 0, 0)'
const FOREGROUND = 'rgb(255, 255, 255)'

let rid = 0

type Particle = {
  x: number,
  y: number,
  l: number,
  /** pixels per second */
  xs: number,
  /** pixels per second */
  ys: number,
}

function rand(max: number, min=0) {
  return Math.random() * (max - min) + min
}

export default function Rain () {
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let w: number
  let h: number
  const particles: Particle[] = []

  function setup () {
    canvas = document.querySelector('#canvas') as HTMLCanvasElement
    w = canvas.width = window.innerWidth - VIEWPORT_OFFSET
    h = canvas.height = window.innerHeight - VIEWPORT_OFFSET
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push({
        x: rand(w),
        y: rand(h),
        l: rand(7),
        xs: 1,
        ys: rand(950, 550), // rand(7, 3)
      })
    }
  }

/*

ys = количество пикселей за секунду
h = количество пикселей на экране
tScreen = h / ys = секунд, за которые проходит один экран
t = миллисекунды, время с загрузки страницы вроде performance.now()
y = (t % tScreen) * ys

*/

  function draw (time: number) {
    ctx.strokeStyle = BACKGROUND
    ctx.fillRect(0, 0, w, h)

    ctx.strokeStyle = FOREGROUND

    for (let p of particles) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x, p.y + p.l)
      ctx.stroke();

      const tScreenY = h / p.ys * 1000
      p.y = (time % tScreenY) * p.ys / 1000

      // TODO: наклон и горизонтальное движение
      // const tScreenW = w / p.xs * 1000
      // p.x = (time % tScreenW) * p.xs / 1000
    }
    rid = rAF(draw)
  }

  useEffect(() => {
    setup()
    rid = rAF(draw)
    return () => {
      cAF(rid)
    }
  })

  return (
    <canvas id="canvas" style={{verticalAlign: 'top'}} />
  )
}
