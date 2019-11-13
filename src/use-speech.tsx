import { useState, useCallback } from 'react';

const defaultSpeechConfig = {
  voice: 'Google US English'
};

const generateMessage = (
  { text, volume = 1, rate = 1, pitch = 1 }: IWebVoiceSpeechMessage,
  config: IUseSpeechConfig
) => {
  const message = new SpeechSynthesisUtterance();

  message.text = text;

  message.volume = volume;
  message.rate = rate;
  message.pitch = pitch;

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
}

export interface IUseSpeechConfig {
  voice?: string;
}

export const useSpeech = (config: IUseSpeechConfig = defaultSpeechConfig) => {
  const [messages, setMessages] = useState<IWebVoiceSpeechMessage[]>([]);

  const speak = useCallback(
    async (message: IWebVoiceSpeechMessage) =>
      new Promise((resolve, reject) => {
        if (!window || !window.speechSynthesis) {
          reject('Web Speech is not supported by your browser');
        }

        setMessages([...messages, message]);

        const speechUtterance = generateMessage(message, config);

        speechUtterance.onend = () => {
          resolve(speechUtterance);
        };

        window.speechSynthesis.speak(speechUtterance);
      }),
    [config]
  );

  return { messages, speak };
};
