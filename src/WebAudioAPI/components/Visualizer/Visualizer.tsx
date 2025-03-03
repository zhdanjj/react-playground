import { memo, useEffect, useRef } from 'react';
import s from './Visualizer.module.scss';

export function VisualizerBase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => {
      const analyser = window.context.createAnalyser();
      window.master.connect(analyser);
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      if (!canvasRef.current) return;
      const canvasCtx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
      const WIDTH = canvasRef.current.width * window.devicePixelRatio;
      const HEIGHT = canvasRef.current.height * window.devicePixelRatio;
      canvasRef.current.width = WIDTH;
      canvasRef.current.height = HEIGHT;

      function draw() {
        analyser.getByteTimeDomainData(dataArray);
        
        canvasCtx.fillStyle = "rgb(200 200 200)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(0 0 0)";

        canvasCtx.beginPath();

        const sliceWidth = (WIDTH * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * HEIGHT) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(WIDTH, HEIGHT / 2);
        canvasCtx.stroke();

        requestAnimationFrame(draw);
      }

      draw()
    }, 500)
  }, []);

  return (
    <div className={s.Visualizer}>
      <canvas className={s.Visualizer__canvas} ref={canvasRef}></canvas>
    </div>
  )
}

export const Visualizer = memo(VisualizerBase);