export interface ADSR {
  attack: number,
  decay: number,
  sustain: number,
  release: number,
}

export function getDefaultAdsr() {
  return {
    attack: .01,
    decay: .2,
    sustain: .2,
    release: .3,
  };
}