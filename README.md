# React Web Voice

## Overview

`react-web-voice` is a library created to ease the integration of Web Speech Api (including speech synthesis and speech recognition) to your React web application.

## Install

```bash
npm install react-web-voice
```

## Web Speech Api Support

At the moment, not all browsers support `Web Speech Api`. The library has been developed and tested on Google Chrome, which is the only browser fully support `Web Speech Api` at the moment.

In the future, as other browsers adopt this feature, the library will be updated accordingly to support them.

More information on this topic can be found here: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

## React Version

The library provide two separated react hooks, namely `useSpeech` and `useRecognition` to support voice speaking and voice recognizing respectively.

As `React` hook is currently an alpha feature, using of the `next` version of react is required.

## useSpeech

##### Usage

`useSpeech` can be used in your functional component to access to the speaking functions.

The hook return a list of `messages` that has already been spoken and a `speak` function that allow you to order the browser to speak.

```javascript
const SpeechComponent = () => {
  const { messages, speak } = useSpeech();

  const speakButtonHandler = () => {
    speak({
      text: 'Hello',
      volume: 0.5,
      rate: 1,
      pitch: 1,
      onSpeakEnd: () => {
        // Do something cool after finish speaking
      }
    });
  };

  return <button onClick={speakButtonHandler}>Click to speak</button>;
};
```

##### Speak function

As shown in the example above the `speak` function accept a `message` object which can be used to define the content of the message, the volume, rate and pitch and a callback function after the browser finish speaking.

##### Configure

By default, `useSpeech` use the `Google Us English`, you can require it to use other voice by passing in a config object:

```javascript
// To get the full list of voices available: window.speechSynthesis.getVoices()
const { messages, speak } = useSpeech({ voice: 'Karen' });
```

## useRecognition

#### Usage

`useRecognition` can be used in your functional component to access to the voice recognition functions.

```javascript
const RecognitionComponent = () => {
  const { transcripts, listen } = useRecognition();

  const listenButtonHandler = () => {
    listen(transcript => {
      console.log(
        `Here is what you say, not really, it's what the browser think you say ${transcript}`
      );
    });
  };

  return <button onClick={listenButtonHandler}>Start speaking</button>;
};
```

##### Listen function

As shown in the example above the `listen` function accept a callback function as its parameter, the callback function will be triggered with the message that the browser detects and recognizes.

## Typescript

This project is written in typescript and fully support it.

## Demo

An example of how to use these two hooks can found inside the demo folder.
