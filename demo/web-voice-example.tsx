import * as React from 'react';
import { useSpeech } from '../src/use-speech';

export const WebVoiceExample: React.FunctionComponent = () => {
  const [messageToSpeak, setMessageToSpeak] = React.useState('');
  const { speak, messages } = useSpeech();

  const messageInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMessageToSpeak(evt.target.value);
  };

  const speakClickHandler = () => {
    speak({ text: messageToSpeak });
  };

  return (
    <div>
      <input
        onChange={messageInputHandler}
        type="text"
        placeholder="Please enter your message here"
      />
      <button onClick={speakClickHandler}>Speak it</button>
      <ul>
        {messages.map(({ text }) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </div>
  );
};
