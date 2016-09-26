'use strict';

import R from 'ramda';
import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import VTopicPane from './containers/VTopicPane';
import VEntryPane from './containers/VEntryPane';
import { mbApp } from './reducers';
import { toggleSidebar, showSidebar, hideSidebar, fetchPageCount, fetchTopics, fetchEntries } from './actions';
import { sbInit, sbHide, sbShow, sbToggle, setScrollable } from './external/sidebar';
import { entriesId, sidebarId } from './config';

const bodyColors = [
  '#8b8b83', '#696969', '#cd5c5c', '#8fbc8f', '#66cdaa', '#008b8b', '#483d8b', '#cd5555', '#838b83', '#6e7b8b', '#8b7b8b'
];

const Head = ({ sbOpen, openSidebar }) => {
  let mStyles = {
    background: 'center/100% url("images/gretel.jpg")',
    color: '#cccccc',
    position: 'relative'
  };
  let aStyles = {
    position: 'absolute',
    top: 5,
    right: 5
  };
  let button = sbOpen ? '' : <button style={aStyles} className="btn btn-default btn-md" aria-label="Topics" onClick={openSidebar}><span className="glyphicon glyphicon-flash" aria-hidden="true"></span></button>;
  return (
    <div className="col-md-12 jumbotron" style={mStyles}>
      <h1>Martenblog</h1>
      <p>Here lies the Marten, eternally beneath the splintered earth.</p>
      {button}
    </div>
  );
};
const VHead = connect(
  state => {
    return {
      sbOpen: state.sbOpen
    };
  },
  dispatch => {
    return {
      openSidebar: () => {
	sbShow();
	dispatch(showSidebar());
      }
    };
  }
)(Head);

const Thorax = ({ y, m, d }) => {
  return (
    <div className="col-md-12">
      <VEntryPane y={y} m={m} d={d} />
    </div>
  );
};
const VThorax = connect(
  (_, ownProps) => {
    return {
      y: ownProps.y,
      m: ownProps.m,
      d: ownProps.d
    };
  }
)(Thorax);

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
    let page = this.props.page || 1;
    this.props.dispatch(fetchPageCount(parseInt(page)));
    this.props.dispatch(fetchTopics(true));
    setTimeout(() => {
      dispatch(hideSidebar());
      sbHide();
    }, 500);
    setTimeout(() => {
      disptach(hideSidebar());
      sbHide();
    }, 2000);    
  }
  render() {
    let { page, y, m, d } = this.props;
    let sidebarStyle = { overflow: 'hidden' };
    let sidebarContaitnerStyle = { backgroundColor: 'rgba(192, 192, 192, 0.5)' };
    return(
      <div id="martenblog-layout-container" className="layout-container">
	<div id="martenblog-content" className="layout-content">
	  <div className="container-fluid">
	    <VHead />
	    <VThorax y={y} m={m} d={d}/>
	    <Abdomen />
	  </div>
	</div>
	<div id="martenblog-sidebar" className="sidebar sidebar-right sidebar-size-20c" data-position="right" style={sidebarStyle}>
	  <div className="container-fluid" style={sidebarContaitnerStyle}>
	    <VTopicPane />
	  </div>
	</div>
      </div>
    );
  };
}
const VMartenblog = connect(
  (_, ownProps) => {
    let { page, y, m, d } = ownProps.params;
    return { page, y, m, d };
  },
  (dispatch, ownProps) => {
    let { page, y, m, d } = ownProps.params;
    return {
      dispatch: dispatch
    };
  }
)(Martenblog);

const store = createStore(mbApp, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={VMartenblog}>
	<IndexRoute component={VMartenblog} />
	<Route path="/:page" component={VMartenblog} />
	<Route path="/:y/:m/:d" component={VMartenblog} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('martenblog')
);
