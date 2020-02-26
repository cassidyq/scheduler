import { useState } from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (mode, replace = false) {
    if (replace) {
      setMode(mode);
      setHistory(prev => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      setMode(mode);
      setHistory(prev => [ ...prev, mode]);
    }
  }

  function back() {
    const copy = [...history];
    copy.pop();
    if (history.length <= 1){
      return;
    } else {
      setMode(copy[copy.length - 1]);
      setHistory([...copy]);
    }
  }

  return {mode, transition, back};
}