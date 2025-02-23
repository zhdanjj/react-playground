export interface IPolyphony {
  oscillatorsCount: number;
  detune: number;
}

export function getDefaultPolyphony() {
  return {
    oscillatorsCount: 3,
    detune: 2,
  }
}