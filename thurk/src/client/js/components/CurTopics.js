'use strict';

import R from 'ramda';
import React from 'react';

const CurTopics = ({ curTopics, removeTopic }) => {
  let ulStyle = { marginBottom: 5 };
  let liStyle = { border: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 0, paddingBottom: 0, backgroundColor: '#777777', color: '#dddddd' };
  let aStyle = { margin: 0, padding: 0, paddingLeft: 2, paddingRight: 2, color: '#dddddd' };
  let keys = R.keys(curTopics);
  console.log(`keys: ${JSON.stringify(keys)}`);
  let curTopicsView = '';
  if(keys.length > 0) {
    let topics = R.map(key => {
      return (
	<li className="list-group-item" key={key} style={liStyle}>
	  <a href="#" onClick={() => removeTopic(curTopics[key])} style={aStyle}>
	    {key}
	  </a>
	</li>
      );
    }, keys);
    curTopicsView = (
      <div>
	<div>Selected topics:</div>
	<ul className="list-group" style={ulStyle}>{topics}</ul>
      </div>
    );
  }
  return (
    <div>
      {curTopicsView}
    </div>
  );
};

export default CurTopics;

