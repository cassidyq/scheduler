import { useState } from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // console.log(mode, history);
  function transition (mode, replace = false) {
    if (replace) {
      const copy = [...history];
      copy.pop();
      setMode(mode);
      setHistory([...copy, mode]);
    } else {
      setMode(mode);
      setHistory([ ...history, mode]);
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