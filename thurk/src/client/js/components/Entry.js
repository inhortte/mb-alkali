'use strict';

import R from 'ramda';
import marked from 'marked';
import React from 'react';

const Entry = ({ entry, topics, expanded, addTopic, toggleExpand }) => {
  let entryStyle = {
    margin: '0 0 5px 0',
    paddingTop: 5,
    backgroundColor: '#b0c4de',
    'WebkitBorderRadius': 10,
    'MozBorderRadius': 10,
    'borderRadius' :10
  };
  let subjectStyle = {
    fontSize: 'larger',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: 5
  };
  let dateStyle = {
    fontSize: 'smaller',
    fontStyle: 'oblique',
    textAlign: 'right'
  };
  let expandCollapseStyle = {
    textAlign: 'right',
    fontSize: 'smaller',
    fontWeight: 'bold'
  };
  let topicViews = R.compose(R.map(t => {
    return (
      <span key={t.id}>
	<span className="glyphicon glyphicon-arrow-right"></span>
	{' '}
	<a href="#" onClick={() => addTopic(t)}>{t.topic}</a>
	{' '}
      </span>
    );
  }))(topics);
  let entryHtml = {
    __html: expanded ? marked(entry.entry) : `${entry.entry.slice(0, 200)}...`
  };
  let dateOpts = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  let date = new Intl.DateTimeFormat('en-GB', dateOpts).format(new Date(entry.created_at));
  return (
    <div className="col-md-8 col-md-push-2 entry" style={entryStyle}>
      <div className="row">
	<div className="col-md-12" style={subjectStyle}>
	  {entry.subject}
	</div>
      </div>
      <div className="row">
	<div className="col-md-8">
	  Topics: {topicViews}
	</div>
	<div className="col-md-4">
	  <div style={dateStyle}>{date}</div>
	  <div style={expandCollapseStyle}>
	    <a href="#" onClick={() => toggleExpand(entry._id)}>
	      {expanded ? 'contract' : 'expand'}
	    </a>
	  </div>
	</div>
      </div>
      <hr />
      <div className="row">
	<div className="col-md-12" dangerouslySetInnerHTML={entryHtml} />
      </div>
    </div>
  );
};

export default Entry;

