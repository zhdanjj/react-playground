export interface IPolyphony {
  oscillatorsCount: number;
  detune: number;
}

export function getDefaultPolyphony() {
  return {
    oscillatorsCount: 1,
    detune: 0,
  }
}