import { useState, useEffect, useRef } from "react";

import { Sx, Text } from "@mantine/core";

interface IUseTypingTextArgs {
  words: string[];
  keySpeed?: number;
  maxPauseAmount?: number;
  style?: Sx;
}

enum Direction {
  FORWARD = "forward",
  BACKWARD = "backward",
}

const useTypingText = ({
  words,
  keySpeed = 100,
  maxPauseAmount = 1000,
  style: providedStyle,
}: IUseTypingTextArgs) => {
  const [isStopped, setIsStopped] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[wordIndex].split(""));

  const direction = useRef(Direction.BACKWARD);
  const typingInterval = useRef<ReturnType <typeof setInterval>>();
  const letterIndex = useRef<number>();

  const stop = () => {
    clearInterval(typingInterval.current);
    setIsStopped(true);
  }

  useEffect(() => {
    let pauseCounter = 0;

    if (isStopped) return;

    const backspace = () => {
      if (letterIndex.current === 0) {
        const isOnLastWord = wordIndex === words.length - 1;
    
        setWordIndex(!isOnLastWord ? wordIndex + 1 : 0);
        direction.current = Direction.FORWARD;
    
        return;
      }
    
      const segment = currentWord.slice(0, currentWord.length - 1);
      setCurrentWord(segment);
      letterIndex.current = currentWord.length - 1;
    }

    const typeLetter = () => {
      if (letterIndex.current === undefined) return;
  
      if (letterIndex.current >= words[wordIndex].length) {
        direction.current = Direction.BACKWARD;
        pauseCounter = maxPauseAmount;
  
        return;
      }
      const segment = words[wordIndex].split('');
      setCurrentWord(currentWord.concat(segment[letterIndex.current]));
      letterIndex.current = letterIndex.current + 1;
    }

    typingInterval.current = setInterval(() => {
      if (pauseCounter > 0) {
        pauseCounter = pauseCounter - 1;
        return;
      }

      if (direction.current === Direction.FORWARD) {
        typeLetter();
      } else {
        backspace();
      }
    }, keySpeed);

    return () => {
      clearInterval(typingInterval.current);
    }
  }, [currentWord, wordIndex, keySpeed, words, isStopped, maxPauseAmount]);

  return {
    text: (
      <Text sx={{
        display: 'block',
        width: 'fit-content',

        '& > .mantine-Text-root': {
          position: 'relative',
          color: '#fff',

          ...(!currentWord.length && { visibility: 'hidden' }),
        },

        '& > .mantine-Text-root::after': {
          content: '""',
          width: '8px',
          height: '100%',
          background: '#ff5252',
          display: 'block',
          position: 'absolute',
          right: '-10px',
          top: 0,
          animation: 'blink 0.5s ease infinite alternate-reverse',

          ...(!currentWord.length && { visibility: 'visible', right: 0 }),
        },
        ...providedStyle,
      }}>
        <Text sx={{ fontFamily: 'inherit' }}>{currentWord.length ? currentWord.join('') : '0'}</Text>
      </Text>
    ),
    start: () => setIsStopped(false),
    stop,
  };
};

export default useTypingText;