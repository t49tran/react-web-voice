import * as React from 'react';
import * as ReactDom from 'react-dom';
import { WebVoiceExample } from './web-voice-example';
import { WebRecognitionExample } from './web-recognition-example';

ReactDom.render(
  <div>
    <h2>Web Speech Example</h2>
    <WebVoiceExample />

    <h2>Web Recognition Example</h2>
    <WebRecognitionExample />
  </div>,
  document.getElementById('app')
);
