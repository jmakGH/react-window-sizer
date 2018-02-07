import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

import WindowSizer from '../src';

jest.mock('lodash.debounce');
jest.mock('lodash.throttle');

describe('<WindowSizer />', () => {
  // Save reference to original removeEventListener func to restore after tests.
  const {removeEventListener} = window;

  beforeAll(() => {
    // Add a method to resize the window.
    window.resizeTo = ({width = 0, height = 0}) => {
      window.innerWidth = width;
      window.innerHeight = height;
      window.dispatchEvent(new Event('resize'));
    };

    // Mock removeEventListener
    window.removeEventListener = jest.fn();
  });

  afterAll(() => {
    // Remove the method we added to resize the window.
    window.resizeTo = undefined;

    // Restore original removeEventListener.
    window.removeEventListener = removeEventListener;
  });

  // Returns a setup function for our tests that accepts an object of props to
  // inject into the component.
  const setup = setupMount(WindowSizer, {
    children: ({height, width}) => <div style={{height, width}} />,
  });

  it('should render', () => {
    const {tree, wrapper} = setup();

    expect(wrapper.exists).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });

  it('should pass the window size to its child', () => {
    const {wrapper} = setup();
    const child = wrapper.find('div');

    expect(child.prop('style')).toEqual({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  });

  it('should pass the updated size to its child when the window resizes', () => {
    const {wrapper} = setup();

    window.resizeTo({height: 100, width: 100});

    wrapper.update();
    const child = wrapper.childAt(0);

    expect(child.prop('style')).toEqual({
      height: 100,
      width: 100,
    });
  });

  it('should call the handler from props on resize', () => {
    const {props} = setup({onResize: jest.fn()});

    expect(props.onResize).not.toHaveBeenCalled();

    window.resizeTo({height: 100, width: 100});

    expect(props.onResize).toHaveBeenCalledTimes(1);
  });

  it('should remove the listener from window on unmount', () => {
    const {wrapper} = setup();

    // Need to clear this after setup since it appears enzyme adds and removes
    // a handful of error listeners during mounting.
    window.removeEventListener.mockClear();

    expect(window.removeEventListener.mock.calls).toHaveLength(0);

    wrapper.unmount();

    /**
     * TODO:
     * A bunch of error listeners are added and removed when unmounting.
     * Possibly through enzyme although not sure of this. This means we have to
     * filter out all the calls to the mock function for the resize listener of
     * which there should only be one.
     */
    const resizeListeners = window.removeEventListener.mock.calls.filter(call => (
      call[0] === 'resize'
    ));

    expect(resizeListeners).toHaveLength(1);
  });

  it('should use the specified optimizer', () => {
    debounce.mockClear();
    throttle.mockClear();

    expect(debounce).not.toHaveBeenCalled();

    setup({optimizeBy: 'debounce'});

    expect(debounce).toHaveBeenCalledTimes(1);

    expect(throttle).not.toHaveBeenCalled();

    setup({optimizeBy: 'throttle'});

    expect(throttle).toHaveBeenCalledTimes(1);
  });
});
