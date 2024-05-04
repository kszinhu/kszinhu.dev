import { MantineStyleProp, Text } from '@mantine/core';

import classes from './typingText.module.css';

interface ITypingTextProps {
  currentWord: string[];
  style?: MantineStyleProp;
}

const TypingText = ({ currentWord, style: providedStyle }: ITypingTextProps) => (
  <Text component="span" className={classes['typing-text']} style={providedStyle}>
    <Text component="p" style={{ fontFamily: 'inherit' }}>
      {currentWord.length ? currentWord.join('') : '0'}
    </Text>
  </Text>
);

export default TypingText;
