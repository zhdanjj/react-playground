export interface IEcho {
  enabled: boolean;
  duration: number;
  feedback: number;
}

export function getDefaultEcho() {
  return {
    enabled: false,
    duration: .4,
    feedback: .6,
  }
}
