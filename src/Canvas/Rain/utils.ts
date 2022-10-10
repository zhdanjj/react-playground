const FAKE_RAF = false
const FPS = 120

export function rAF (callback: (time: number) => void) {
  if (FAKE_RAF) {
    return window.setTimeout(() => {
      callback(performance.now())
    }, 1000 / FPS)
  } else {
    return window.requestAnimationFrame(callback)
  }
}

export function cAF (requestID: number) {
  if (FAKE_RAF) {
    clearTimeout(requestID)
  } else {
    window.cancelAnimationFrame(requestID)
  }
}