import { createNoise3D } from "simplex-noise"
import type { NoiseFunction3D } from "simplex-noise"
import { useEffect } from "react"

// heavily inspired by https://codepen.io/DonKarlssonSan/pen/WzbYBr

const defaults = {
  pointsCount: 200,
  lineWidth: 1,
  gap: 10,
  mx: 50,
  my: 50,
  background: '#000',
  foreground: '#fff',
}

type PerlinNoiseCircleProps = {
  pointsCount: number,
  lineWidth: number,
  gap: number,
  mx: number,
  my: number,
  background: string,
  foreground: string,
}

export default function PerlinNoiseCircle (props: PerlinNoiseCircleProps) {
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let w: number
  let h: number
  let m: number
  let mx: number
  let my: number
  let now: number
  let noise: NoiseFunction3D

  function setup () {
    canvas = document.querySelector('#canvas') as HTMLCanvasElement
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    w = canvas.width = window.innerWidth - 32
    h = canvas.height = window.innerHeight - 32
    m = Math.min(w, h)
    mx = w / 2
    my = h / 2
    noise = createNoise3D()
  }

  function draw(timestamp: number) {
    now = timestamp;
    requestAnimationFrame(draw);
    ctx.fillStyle = props.background;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = props.foreground;
    for(let i = 10; i < m / 2 - 40; i += props.gap) {
      drawCircle(i);
    }
  }

  function drawCircle(r: number) {
    ctx.beginPath();
    ctx.lineWidth = props.lineWidth;
    const deltaAngle = Math.PI * 2 / props.pointsCount;
    for (let angle = 0; angle < Math.PI * 2; angle += deltaAngle) {
      ctx.lineTo(
        ...calcPoint(angle, r)
      );
    }
    ctx.closePath();
    ctx.stroke();
  }

  function calcPoint(angle: number, r: number): [number, number] {
    let noiseFactor = props.mx / w * 50;
    let zoom = props.my / h * 200;
    let x = Math.cos(angle) * r + w / 2;
    let y = Math.sin(angle) * r + h / 2;
    let n = (noise(x / zoom, y / zoom, now / 1000)) * noiseFactor;
    x = Math.cos(angle) * (r + n) + w / 2;
    y = Math.sin(angle) * (r + n) + h / 2;
    return [x, y];
  }

  useEffect(() => {
    setup()
    draw(0)
  })

  return (
    <canvas id="canvas" style={{verticalAlign: 'top'}} />
  )
}

PerlinNoiseCircle.defaultProps = defaults