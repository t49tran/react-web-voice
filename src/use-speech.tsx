import * as React from 'react';

const defaultSpeechConfig = {
  voice: 'Google US English'
};

const generateMessage = (
  { text, volume = 1, rate = 1, pitch = 1, onSpeakEnd }: IWebVoiceSpeechMessage,
  config: IUseSpeechConfig
) => {
  const message = new SpeechSynthesisUtterance();

  message.text = text;

  message.volume = volume;
  message.rate = rate;
  message.pitch = pitch;

  // set callback once the speak finish here here
  if (onSpeakEnd) {
    message.onend = onSpeakEnd;
  }

  message.voice = speechSynthesis
    .getVoices()
    .find(voice => voice.name === config.voice) as SpeechSynthesisVoice;

  return message;
};

export interface IWebVoiceSpeechMessage {
  text: string;
  volume?: number;
  rate?: number;
  pitch?: number;
  onSpeakEnd?: (event: SpeechSynthesisEvent) => void;
}

export interface IUseSpeechConfig {
  voice?: string;
}

export const useSpeech = (config: IUseSpeechConfig = defaultSpeechConfig) => {
  const [messages, setMessages] = React.useState<IWebVoiceSpeechMessage[]>([]);

  const speak = (message: IWebVoiceSpeechMessage) => {
    if (!window || !window.speechSynthesis) {
      throw new Error('Web Speech is not supported by your browser');
    }

    setMessages([...messages, message]);

    window.speechSynthesis.speak(generateMessage(message, config));
  };

  return { messages, speak };
};
