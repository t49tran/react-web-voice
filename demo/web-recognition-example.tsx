import * as React from 'react';
import { useRecognition } from '../src/use-recognition';

export const WebRecognitionExample: React.FunctionComponent = () => {
  const [isListening, setIsListening] = React.useState(false);
  const { transcripts, listen } = useRecognition();

  const speakClickHandler = async () => {
    setIsListening(true);

    const recognizedMessage = await listen();

    console.log(recognizedMessage);
  };

  return (
    <div>
      {isListening ? (
        'Please activate your microphone and speak...'
      ) : (
        <button onClick={speakClickHandler}>Start Listening</button>
      )}
      <ul>
        {transcripts.map(transcript => (
          <li>{transcript}</li>
        ))}
      </ul>
    </div>
  );
};
