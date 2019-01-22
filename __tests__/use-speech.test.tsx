import * as React from 'react';
import { useSpeech } from 'src/use-speech';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

interface IUseSpeechComponentProps {
  useSpeechProps: ReturnType<typeof useSpeech>;
}

const UseSpeechComponent: React.FunctionComponent<
  IUseSpeechComponentProps
> = () => <div />;

const TestComponent: React.FunctionComponent = () => {
  const useSpeechProps = useSpeech();

  return <UseSpeechComponent useSpeechProps={useSpeechProps} />;
};

describe('useSpeech', () => {
  it('can be called inside a functional component to access to messages and speak function', () => {
    const mountedComponent = Enzyme.mount(<TestComponent />);

    const useSpeechComponent = mountedComponent.find(UseSpeechComponent);

    const props = useSpeechComponent.props().useSpeechProps;

    expect(props).toHaveProperty('messages');
    expect(props).toHaveProperty('speak');
  });
});
