import { useEffect, useState } from "react"

import kick from '../assets/audio/kick.mp3'
import hat from '../assets/audio/hat.mp3'
import snare from '../assets/audio/snare.mp3'
import ride from '../assets/audio/ride.mp3'

type Sample = {
  path: string,
  audioBuffer: AudioBuffer | null
}

const samples: Sample[] = [
  {path: hat, audioBuffer: null},
  {path: kick, audioBuffer: null},
  {path: snare, audioBuffer: null},
  {path: ride, audioBuffer: null},
]

export function useInstruments(tracks: number[][]) {
  const [c] = useState(() => new AudioContext)

  function loadSamples() {
    samples.forEach(v => {
      window.fetch(v.path)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => c.decodeAudioData(arrayBuffer))
        .then(audioBuffer => v.audioBuffer = audioBuffer)
    })
  }

  useEffect(() => {
    return () => { c.close() }
  }, [])

  useEffect(() => {
    loadSamples()
  }, [])

  return {
    playAt: (index: number) => {
      if (tracks[0][index]) {
        const source = c.createBufferSource()
        source.buffer = samples[3].audioBuffer
        source.connect(c.destination)
        source.start()
      }

      if (tracks[1][index]) {
        const source = c.createBufferSource()
        source.buffer = samples[0].audioBuffer
        source.connect(c.destination)
        source.start()
      }

      if (tracks[2][index]) {
        const source = c.createBufferSource()
        source.buffer = samples[2].audioBuffer
        source.connect(c.destination)
        source.start(c.currentTime + .03)
      }

      if (tracks[3][index]) {
        const source = c.createBufferSource()
        source.buffer = samples[1].audioBuffer
        source.connect(c.destination)
        source.start(c.currentTime + .03)
      }
    }
  }
}
