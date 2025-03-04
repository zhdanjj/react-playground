import { memo, useEffect, useRef } from 'react';
import s from './Visualizer.module.scss';

export function VisualizerBase({ type }: { type: 'domain' | 'frequency' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (type === 'domain') {
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
    }

    if (type === 'frequency') {
      setTimeout(() => {
        const analyser = window.context.createAnalyser();
        window.master.connect(analyser);
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        /**
         * arr of [0-255]
         */
        const dataArray = new Uint8Array(bufferLength);
  
        if (!canvasRef.current) return;
        const canvasCtx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
        const WIDTH = canvasRef.current.width * window.devicePixelRatio;
        const HEIGHT = canvasRef.current.height * window.devicePixelRatio;
        canvasRef.current.width = WIDTH;
        canvasRef.current.height = HEIGHT;

        let max = -1
  
        function draw() {
          analyser.getByteFrequencyData(dataArray);
          
          canvasCtx.fillStyle = "rgb(0 0 0)";
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
          const barWidth = (WIDTH / bufferLength) * 4;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 255 * HEIGHT;

            canvasCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
            canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            console.log(max);
            max = Math.max(max, barHeight)

            x += barWidth + 1;
          }
  
          requestAnimationFrame(draw);
        }
  
        draw()
      }, 500)
    }
  }, []);

  return (
    <div className={s.Visualizer}>
      <canvas className={s.Visualizer__canvas} ref={canvasRef}></canvas>
    </div>
  )
}

export const Visualizer = memo(VisualizerBase);
