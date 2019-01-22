import * as React from 'react';
import { useRecognition } from 'src/use-recognition';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

interface IUseRecognitionComponentProps {
  useRecognitionProps: ReturnType<typeof useRecognition>;
}

const UseRecognitionComponent: React.FunctionComponent<
  IUseRecognitionComponentProps
> = () => <div />;

const TestComponent: React.FunctionComponent = () => {
  const useRecognitionProps = useRecognition();

  return <UseRecognitionComponent useRecognitionProps={useRecognitionProps} />;
};

describe('useRecognition', () => {
  it('can be called inside a functional component to access to transcript and listen function', () => {
    const mountedComponent = Enzyme.mount(<TestComponent />);

    const useRecognitionComponent = mountedComponent.find(
      UseRecognitionComponent
    );

    const props = useRecognitionComponent.props().useRecognitionProps;

    expect(props).toHaveProperty('transcripts');
    expect(props).toHaveProperty('listen');
  });
});
