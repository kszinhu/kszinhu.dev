import { useState, useEffect, useRef } from 'react';

import { MantineStyleProp } from '@mantine/core';

import TypingText from '@components/typingText';

interface IUseTypingTextArgs {
  words: string[];
  keySpeed?: number;
  maxPauseAmount?: number;
  style?: MantineStyleProp;
}

enum Direction {
  FORWARD = 'forward',
  BACKWARD = 'backward',
}

const useTypingText = ({
  words,
  keySpeed = 100,
  maxPauseAmount = 1000,
  style: providedStyle,
}: IUseTypingTextArgs) => {
  const [isStopped, setIsStopped] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[wordIndex].split(''));

  const direction = useRef(Direction.BACKWARD);
  const typingInterval = useRef<ReturnType<typeof setInterval>>();
  const letterIndex = useRef<number>();

  const stop = () => {
    clearInterval(typingInterval.current);
    setIsStopped(true);
  };

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
    };

    const typeLetter = () => {
      if (letterIndex.current === undefined) return;

      if (letterIndex.current >= words[wordIndex].length) {
        direction.current = Direction.BACKWARD;
        pauseCounter = maxPauseAmount;

        return;
      }
      const segment = words[wordIndex].split('');
      setCurrentWord(currentWord.concat(segment[letterIndex.current]));
      letterIndex.current += 1;
    };

    typingInterval.current = setInterval(() => {
      if (pauseCounter > 0) {
        pauseCounter -= 1;
        return;
      }

      if (direction.current === Direction.FORWARD) {
        typeLetter();
      } else {
        backspace();
      }
    }, keySpeed);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(typingInterval.current);
    };
  }, [currentWord, wordIndex, keySpeed, words, isStopped, maxPauseAmount]);

  return {
    text: <TypingText style={providedStyle} currentWord={currentWord} />,
    start: () => setIsStopped(false),
    stop,
  };
};

export default useTypingText;
