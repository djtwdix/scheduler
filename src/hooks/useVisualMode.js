import {useState} from 'react'

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial)

    const transition = (second) => {
      setMode(second)
    }

    return {mode, transition}
}