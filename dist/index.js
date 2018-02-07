'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.throttle');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var optimizers = { debounce: _lodash2.default, throttle: _lodash4.default };

var WindowSizer = function (_Component) {
  _inherits(WindowSizer, _Component);

  function WindowSizer(props) {
    _classCallCheck(this, WindowSizer);

    // Set up optimized resize handler.
    var _this = _possibleConstructorReturn(this, (WindowSizer.__proto__ || Object.getPrototypeOf(WindowSizer)).call(this, props));

    _this.getWindowSize = function () {
      return { height: window.innerHeight, width: window.innerWidth };
    };

    _this.handleResize = function (e) {
      var size = _this.getWindowSize();

      _this.props.onResize(e, size);
      _this.setState(size);
    };

    var optimizeBy = props.optimizeBy,
        optimizeEvery = props.optimizeEvery;

    var optimize = optimizers[optimizeBy];

    _this.optimizedOnResize = optimize ? optimize(_this.handleResize, optimizeEvery) : _this.handleResize;

    _this.state = _this.getWindowSize();
    return _this;
  }

  _createClass(WindowSizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.optimizedOnResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.optimizedOnResize);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children({
        height: this.state.height,
        width: this.state.width
      });
    }
  }]);

  return WindowSizer;
}(_react.Component);

WindowSizer.propTypes = {
  /**
   * Render function that this component injects the window height and width
   * into.
   */
  children: _propTypes.func.isRequired,
  /**
   * Callback that is invoked on resize events.
   */
  onResize: _propTypes.func,
  /**
   * Method to optimize the resize handler.
   */
  optimizeBy: (0, _propTypes.oneOf)(['', 'debounce', 'throttle']),
  /**
   * Wait duration in milliseconds to throttle the optimizer invocation.
   */
  optimizeEvery: _propTypes.number
};
WindowSizer.defaultProps = {
  onResize: function onResize() {},
  optimizeBy: '',
  optimizeEvery: 250
};
exports.default = WindowSizer;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map