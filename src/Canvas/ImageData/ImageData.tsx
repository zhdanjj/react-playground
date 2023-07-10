import logo from './logo.png';
import s from './ImageData.module.scss';
import {useEffect} from "react";
import {Animation} from "./particles";

export function ImageData() {
  useEffect(() => {
    // @ts-ignore
    new Animation();
  });

  return (
    <div className={s.ImageData}>
      <canvas></canvas>
      <img
        src={logo}
        alt=""
        className={`logo ${s.ImageData__logo}`}
      />
    </div>
  )
}