'use strict';

import { connect } from 'react-redux';
import { removeTopic } from '../actions';
import CurTopics from '../components/CurTopics';

const mapStateToProps = state => {
  return {
    curTopics: state.curTopics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeTopic: topic => dispatch(removeTopic(topic))
  };
};

const VCurTopics = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurTopics);

export default VCurTopics;
