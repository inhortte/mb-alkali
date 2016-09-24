'use strict';

import { connect } from 'react-redux';
import Topic from '../components/Topic';
import { addTopic } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    topic: ownProps.topic
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTopic: topic => dispatch(addTopic(topic))
  };
};

const VTopic = connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic);

export default VTopic;
