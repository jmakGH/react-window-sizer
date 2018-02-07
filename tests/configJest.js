'use strict';

require('babel-polyfill');
const React = require('react');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const toJson = require('enzyme-to-json').default;

global.React = React;

Enzyme.configure({adapter: new Adapter()});

const createSetupRenderer = renderer => (Component, defaultProps) => (customProps) => {
  const props = Object.assign({}, defaultProps, customProps);

  const wrapper = renderer(<Component {...props} />);

  return {
    props,
    wrapper,
    tree: toJson(wrapper),
  };
};

global.setupShallow = createSetupRenderer(Enzyme.shallow);
global.setupMount = createSetupRenderer(Enzyme.mount);
