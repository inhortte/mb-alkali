'use strict';

import { connect } from 'react-redux';
import { removeTopic } from '../actions';
import DateEntry from '../components/DateEntry';

const mapStateToProps = (state, ownProps) => {
  let { y, m, d } = ownProps;
  return {
    entries: state.entries,
    y: y,
    m: m,
    d: d
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

const VDateEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(DateEntry);

export default VDateEntry;
