'use strict';

import React from 'react';

const Topic = ({ topic, addTopic }) => {
  let style = { border: 0, padding: '1 3 1 3', margin: 0, backgroundColor: '#b0c4de', color: '#333334' };
  return (
    <a href="#" className="list-group-item" style={style} onClick={() => addTopic(topic)}>{topic.topic}</a>
  );
};

export default Topic;

