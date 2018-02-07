# react-window-sizer

A higher-order React component that passes the browser's window dimensions.

[![Build Status](https://api.travis-ci.org/jmakGH/react-window-sizer.svg?branch=master)](https://travis-ci.org/jmakGH/react-window-sizer)
[![Coverage Status](https://coveralls.io/repos/github/jmakGH/react-window-sizer/badge.svg?branch=master)](https://coveralls.io/github/jmakGH/react-window-sizer?branch=master)
![gzip size](http://img.badgesize.io/https://unpkg.com/react-window-sizer/dist/index.js?compression=gzip)

## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Props](#props)

## Installation

To install, you can use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com).

```
$ npm install react-window-sizer
$ yarn add react-window-sizer
``` 

## Usage

The WindowSizer component has one required prop:
  * ```children``` which must be a function that this component will inject the
  browser's dimensions into.

Example:

```jsx
<WindowSizer>
  {({height, width}) => (
    <SomeComponent style={{height, width}} />
  )}
</WindowSizer>
```

### Optimizing the resize event

You can optimize the resize handler by specifying whether or not to throttle or
debounce it through the ```optimizeBy``` prop.

The component defaults to not optimize, but you can opt in by passing in a string
value of either ```'debounce'``` or ```'throttle'```.

This can be more fine-tuned by also specifying a wait duration through the
```optimizeEvery``` prop. This throttles the handler's invocation in milliseconds.

Example:

```jsx
<WindowSizer optimizeBy="debounce" optimizeEvery={300}>
  {({height, width}) => (
    <SomeComponent style={{height, width}} />
  )}
</WindowSizer>
```
> This will debounce the resize event handler every 300ms.

### Resize event callback

You can pass in a callback that will be invoked whenever the resize event handler
is called through the ```onResize``` prop.

The original event object and the browser's current window dimensions are passed
to the callback.

Example:

```jsx
function handleResize(e, dimensions) {
  // ...do something
}

<WindowSizer onResize={handleResize}>
  {({height, width}) => (
    <SomeComponent style={{height, width}} />
  )}
</WindowSizer>
```

## Props

| Name          | Required? | Type     | Default        |
| ------------- | --------- | -------- | -------------- |
| children      | Yes       | function |                |
| onResize      |           | function | ```() => {}``` |
| optimizeBy    |           | string   | ```''```       |
| optimizeEvery |           | number   | ```250```      |
