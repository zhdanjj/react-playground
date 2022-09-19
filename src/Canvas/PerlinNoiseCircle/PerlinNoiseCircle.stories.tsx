import PerlinNoiseCircle from "./PerlinNoiseCircle";

function makeRange(default_: number, min: number, max: number) {
  return {
    defaultValue: default_,
    control: {
      type: 'range',
      min,
      max,
    },
  }
}

function makeColorPicker(default_: string) {
  return {
    defaultValue: default_,
    control: {
      type: 'color',
    },
  }
}

// TODO: если долго крутить крутилки начинает тормозить
export default {
  title: 'Canvas / Perlin Noise Circle',
  component: PerlinNoiseCircle,
  argTypes: {
    pointsCount: makeRange(200, 3, 400),
    lineWidth: makeRange(1, 1, 100),
    gap: makeRange(10, 1, 100),
    mx: makeRange(750, 1, 1000),
    my: makeRange(300, 1, 1000),
    background: makeColorPicker('#000'),
    foreground: makeColorPicker('#fff'),
  },
}

export const PerlinNoiseCircle_ = <PerlinNoiseCircle />