export interface ADSR {
  attack: number,
  decay: number,
  sustain: number,
  release: number,
}

export function getDefaultAdsr() {
  return {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0,
  };
}