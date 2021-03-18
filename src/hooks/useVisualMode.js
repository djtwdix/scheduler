import { useState } from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (next, replace) => {
    setMode(next)
    setHistory([...history, next])
    if (replace) {
      setHistory([initial, next])
    }
  }

  
  const back = () => {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length - 1])
    }
  }

  return { mode, transition, back }
}