import * as React from 'react';

export interface IWebVoiceSpeechMessage {
  text: string;
  onSpeakEnd?: (event: SpeechSynthesisEvent) => void;
}

export interface IUseSpeechConfig {
  voice?: string;
}

const generateMessage = ({ text, onSpeakEnd }: IWebVoiceSpeechMessage) => {
  const message = new SpeechSynthesisUtterance();

  message.text = text;

  message.volume = 1;
  message.rate = 1;
  message.pitch = 1;
  // set callback here
  if (onSpeakEnd) {
    message.onend = onSpeakEnd;
  }

  message.voice = speechSynthesis
    .getVoices()
    .find(voice => voice.name === 'Google US English') as SpeechSynthesisVoice;

  return message;
};

const defaultSpeechConfig = {};

export const useSpeech = (config: IUseSpeechConfig = defaultSpeechConfig) => {
  const [messages, setMessages] = React.useState<IWebVoiceSpeechMessage[]>([]);

  const speak = (message: IWebVoiceSpeechMessage) => {
    if (!window || !window.speechSynthesis) {
      throw new Error('Web Speech is not supported by your browser');
    }

    setMessages([...messages, message]);

    window.speechSynthesis.speak(generateMessage(message));
  };

  return { messages, speak };
};
