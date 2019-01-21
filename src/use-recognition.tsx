import * as React from 'react';

export type RecognitionCallback = (recognizedText: string) => void;

export const getSpeechRecognition = () => {
  if (!window || !(window as any).webkitSpeechRecognition) {
    throw new Error('Your browser does not support web speech recognition');
  }

  const speechRecognition = new (window as any).webkitSpeechRecognition();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  return speechRecognition as SpeechRecognition;
};

export const useRecognition = () => {
  const [transcripts, setTranscripts] = React.useState<string[]>([]);

  const listen = (recognitionCallback: RecognitionCallback) => {
    const speechRecognition = getSpeechRecognition();

    speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      const finalResult = Array.from(event.results).find(
        entry => entry.isFinal
      );

      // If it's not the final result yet, just ignore
      if (!finalResult) {
        return;
      }

      // stop the recognition process
      speechRecognition.stop();

      const { transcript } = finalResult[0];

      setTranscripts([...transcripts, transcript]);

      // trigger the callback
      recognitionCallback(transcript);
    };
    speechRecognition.start();
  };

  return { transcripts, listen };
};
