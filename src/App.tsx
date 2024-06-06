import { useState,useEffect,useRef } from "react"
import styles from  './app.module.css';
import { useFingerFastStore } from "./util/store";
import { FocusWrapper, GameSummary } from "./components";
import { LuTimer, LuCaseSensitive, LuSkull, LuStar } from "react-icons/lu";
import {texts} from "./util/texts"

export function App() {
  const { points, earnedPoints, setPoints, setEarnedPoints } = useFingerFastStore();
  const [mistake, setMistakes] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [capsLock, setCapsLock] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>(texts[0]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<number | null>(null);
  const [endTimer, setEndTimer] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    setCurrentText(texts[Math.floor(Math.random() * texts.length)]);

    const focusInput = () => {
      setIsFocused(true);
      inputRef.current?.focus();
    }

    const handleClick = () => focusInput();

    const handleKeyPress = (event: KeyboardEvent) => {
      if(event.getModifierState("CapsLock")) {
        setCapsLock(true)
      } else {
        setCapsLock(false)
      }
      focusInput();
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleClick);
    }

  },[])

  useEffect(() => {
    let interval: NodeJs.Timeout | null = null;
    if(isFocused && isCompleted && timer > 0 ) {
      interval = setInterval(() => {
        setTimer ((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer <= 0) {
      setIsCompleted(true)
    }

    return () => {
      if (interval) clearInterval(interval);
    }
  },[isFocused, isCompleted, timer])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!startTimer) setStartTimer(Date.now())
      if(isCompleted || timer <= 0) return 
    
    let newValue = event.target.value;
    let currentMistake = mistake;

    if(newValue.length >= currentText.length) {
      newValue = newValue.slice(0, currentText.length)
      setIsCompleted(true);
      setEndTimer(Date.now());
      calculatePoints(currentMistake);
    }

    if(!isCompleted && newValue.length > input.length) {
      const lastTypeChar = newValue[newValue.length - 1];
      const currentChar = currentText[newValue.length - 1];

      if(lastTypeChar !== currentChar) {
        currentMistake += 1;
        setMistakes(currentMistake);
      }
    }
    setInput(newValue);
  }

  const calculateWPM = () => {
    if(!startTimer || !endTimer ) return 0
    const timeTaken = (endTime - startTime) / 60000
    const wordCount = currentText.split(" ").length;
    return (wordCount / timeTaken).toFixed(2); 
  } 
  |
  const calculatePoints = (mistakes: number) => {
    const textLength = currentText.replace(/\s/g, "").length;
    let pointsEarned = 0;

    if(mistake < textLength) {
      if(mistakes === 0) {
        pointsEarned = 100
      } else if (mistakes <= 5) {
        pointsEarned = 80
      } else if (mistake <= 10) {
        pointsEarned = 60;
      } else if (mistake <= 15) {
        pointsEarned = 40
      } else {
        pointsEarned = 20
      }
    }
    setEarnedPoints(pointsEarned);
  };

  const handleReplay = () => {
    setInput("");
    setMistakes(0);
    setIsCompleted(false);
    setEarnedPoints(0);
    setPoints(points + earnedPoints);
    inputRef.current?.focus();
    setTimer(30);
    setStartTimer(null);
    setEndTimer(null);
    setCurrentText(texts[Math.floor(Math.random() * texts.length)]);
    setPoints(points - mistake + earnedPoints);
  };

  const renderText = (): JSX.Element[] => {
      
  }

  return (
    <>
      
    </>
  )
}

export default App
