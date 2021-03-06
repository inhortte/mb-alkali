'use strict';

import R from 'ramda';
import React from 'react';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import hashHistory from 'react-router/lib/hashHistory';
import IndexRoute from 'react-router/lib/IndexRoute';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import VTopicPane from './containers/VTopicPane';
import VEntryPane from './containers/VEntryPane';
import { mbApp } from './reducers';
import { setEFormat, toggleSidebar, showSidebar, hideSidebar, fetchPageCount, fetchTopics, fetchEntries, fetchDateEntry } from './actions';
import { sbInit, sbHide, sbShow, sbToggle, setScrollable } from './external/sidebar';
import { entriesId, sidebarId, EFormats } from './config';

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
      <VEntryPane />
    </div>
  );
};
const VThorax = connect(
  (_, ownProps) => {
    return {
    };
  }
)(Thorax);

const Abdomen = () => (
  <div className="col-md-12">
    <hr />
    <p className="well well-sm">
      <span>
        Along with martens, goulish goats and the rippling fen - these writings
        and any accompanying multimedia Copyright
      </span>
      {' '}
      <span className="glyphicon glyphicon-copyright-mark"></span>
      {' '}
      <span>Bob Murry Shelton 2016.</span>
    </p>
  </div>
);

class Martenblog extends React.Component {
  componentDidMount() {
    let { dispatch, page, y, m, d } = this.props;
    document.body.style.background = bodyColors[Math.floor(Math.random() * bodyColors.length)];
    sbInit();
    if(y && m && d) {
      dispatch(setEFormat(EFormats.BY_DATE));
      setTimeout(() => dispatch(fetchDateEntry(y, m, d)), 1000);
    } else {
      dispatch(setEFormat(EFormats.BY_PAGE));
      let curPage = page || 1;
      dispatch(fetchPageCount(parseInt(curPage)));
      // setTimeout(() => dispatch(fetchEntries()), 1000);
    }
    dispatch(fetchTopics(true));
    setTimeout(() => {
      dispatch(hideSidebar());
      sbHide();
    }, 500);
    setTimeout(() => {
      dispatch(hideSidebar());
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
	    <VThorax />
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
