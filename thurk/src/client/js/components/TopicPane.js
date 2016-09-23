'use strict';

import React from 'react';

const searchPlaceholders = [
  'Kill Christián', 'Shave your goat', 'The bog encroaches', 'Mrdat', 'Dissolving Petuitary',
  'I snorted your lamp', 'Stapleguns aloft', 'Excoriate the woman'
];

const TopicPane = () => {
  return (
    <div className="container-fluid">
      <div className="sidebar-block sidebar-brand-border sidebar-p-y form-group">
	<h3>Search</h3>
	<input className="form-control" type="text" placeholder={searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)]} />
      </div>
      <div className="sidebar-block sidebar-brand-border sidebar-p-y form-group">
	<h3>Topics</h3>
	<input className="form-control" type="text" placeholder={searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)]} />
      </div>
    </div>
  );
};

export default TopicPane;
