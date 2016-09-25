'use strict';

import R from 'ramda';
import { connect } from 'react-redux';
import Entry from '../components/Entry';
import { addTopic, toggleExpand } from '../actions';

const mapStateToProps = (state, ownProps) => {
  let topics = R.filter(t => {
    return ownProps.entry.topic_ids.includes(t.id);
  }, state.topics);
  return {
    entry: ownProps.entry,
    topics: topics,
    expanded: ownProps.expanded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTopic: topic => dispatch(addTopic(topic)),
    toggleExpand: entryId => dispatch(toggleExpand(entryId))
  };
};

const VEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);

export default VEntry;
