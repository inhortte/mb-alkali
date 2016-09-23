'use strict';

import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import TopicPane from './components/TopicPane';
import VEntryPane from './containers/VEntryPane';
import { sbInit } from './external/sidebar';
import { mbApp } from './reducers';

const bodyColors = [
  '#8b8b83', '#696969', '#cd5c5c', '#8fbc8f', '#66cdaa', '#008b8b', '#483d8b', '#cd5555', '#838b83', '#6e7b8b', '#8b7b8b'
];

const Head = () => {
  let styles = {
    background: 'center/100% url("images/gretel.jpg")',
    color: '#cccccc'
  };
  return (
    <div className="col-md-12 jumbotron" style={styles}>
      <h1>Martenblog</h1>
      <p>Here lies the Marten, eternally beneath the splintered earth.</p>
    </div>
  );
};

const Thorax = () => (
  <div className="col-md-12">
    <VEntryPane />
  </div>
);

const Abdomen = () => (
  <div className="col-md-12">
    <hr />
    <p className="well well-sm">
      Along with martens, goulish goats and the rippling fen.
    </p>
  </div>
);

class Martenblog extends React.Component {
  componentDidMount() {
    document.body.style.background = bodyColors[Math.floor(Math.random() * bodyColors.length)];
    sbInit();
  }
  render() {
    return(
      <div id="martenblog-layout-container" className="layout-container layout-sidebar-r3-md-up ls-top">
	<div id="martenblog-content" className="layout-content" data-scrollable>
	  <div className="container-fluid">
	    <Head />
	    <Thorax />
	    <Abdomen />
	  </div>
	</div>
	<div id="martenblog-sidebar" className="sidebar sidebar-right sidebar-visible-md-up sidebar-size-20c sidebar-dark bg-primary" data-scrollable data-position="right">
	  <TopicPane />
	</div>
      </div>
    );
  };
}

const store = createStore(mbApp, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Martenblog />
  </Provider>,
  document.getElementById('martenblog')
);
