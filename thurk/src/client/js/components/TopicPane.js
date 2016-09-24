'use strict';

import React from 'react';
import R from 'ramda';

const searchPlaceholders = [
  'Kill Christián', 'Shave your goat', 'The bog encroaches', 'Mrdat', 'Dissolving Petuitary',
  'I snorted your lamp', 'Stapleguns aloft', 'Excoriate the woman'
];

const TopicPane = ({ filteredTopics, curTopics, topicFilterChange }) => {
  let fTopicsViewDivStyle = { marginTop: 5 };
  let fTopicsViewAStyle = { border: 0, padding: '1 3 1 3', margin: 0, backgroundColor: '#777777', color: '#dddddd' };
  let fTopicsView = R.map(t => <a href="#" className="list-group-item" style={fTopicsViewAStyle}>{t.topic}</a>, filteredTopics);
  return (
    <div className="container-fluid">
      <div className="sidebar-block sidebar-brand-border sidebar-p-y form-group">
	<h3>Search</h3>
	<input className="form-control" type="text" placeholder={searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)]} />
      </div>
      <div className="sidebar-block sidebar-brand-border sidebar-p-y form-group">
	<h3>Topics</h3>
	<input className="form-control" type="text" placeholder={searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)]} onChange={topicFilterChange} />
	<div className="list-group" style={fTopicsViewDivStyle}>
	  {fTopicsView}
	</div>
      </div>
    </div>
  );
};

export default TopicPane;
