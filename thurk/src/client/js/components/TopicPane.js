'use strict';

import React from 'react';
import R from 'ramda';
import VTopic from '../containers/VTopic';
import VCurTopics from '../containers/VCurTopics';

const searchPlaceholders = [
  'Kill Christián', 'Shave your goat', 'The bog encroaches', 'Mrdat', 'Dissolving Petuitary',
  'I snorted your dung', 'Stapleguns aloft', 'Excoriate the woman'
];

const TopicPane = ({ filteredTopics, curTopics, topicFilterChange }) => {
  let fTopicsViewDivStyle = { marginTop: 5 };
  let fTopicsView = R.map(t => <VTopic topic={t} key={t.topic} />, filteredTopics);
  return (
    <div className="container-fluid">
      <div className="sidebar-block sidebar-brand-border sidebar-p-y form-group">
	<h3>Search</h3>
	<input className="form-control" type="text" placeholder={searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)]} />
      </div>
      <div className="sidebar-block sidebar-brand-border sidebar-p-y form-group">
	<h3>Topics</h3>
	<VCurTopics />
	<input className="form-control" type="text" placeholder={searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)]} onChange={topicFilterChange} />
	<div className="list-group" style={fTopicsViewDivStyle}>
	  {fTopicsView}
	</div>
      </div>
    </div>
  );
};

export default TopicPane;
