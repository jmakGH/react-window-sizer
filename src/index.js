import {Component} from 'react';
import {func, number, oneOf} from 'prop-types';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

const optimizers = {debounce, throttle};

export default class WindowSizer extends Component {
  static propTypes = {
    /**
     * Render function that this component injects the window height and width
     * into.
     */
    children: func.isRequired,
    /**
     * Callback that is invoked on resize events.
     */
    onResize: func,
    /**
     * Method to optimize the resize handler.
     */
    optimizeBy: oneOf(['', 'debounce', 'throttle']),
    /**
     * Wait duration in milliseconds to throttle the optimizer invocation.
     */
    optimizeEvery: number,
  }

  static defaultProps = {
    onResize: () => {},
    optimizeBy: '',
    optimizeEvery: 250,
  }

  constructor(props) {
    super(props);

    // Set up optimized resize handler.
    const {optimizeBy, optimizeEvery} = props;
    const optimize = optimizers[optimizeBy];

    this.optimizedOnResize = (optimize
      ? optimize(this.handleResize, optimizeEvery)
      : this.handleResize
    );

    this.state = this.getWindowSize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.optimizedOnResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.optimizedOnResize);
  }

  getWindowSize = () => {
    return {height: window.innerHeight, width: window.innerWidth};
  }

  handleResize = (e) => {
    const size = this.getWindowSize();

    this.props.onResize(e, size);
    this.setState(size);
  }

  render() {
    return this.props.children({
      height: this.state.height,
      width: this.state.width,
    });
  }
}
