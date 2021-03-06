'use strict';

import { connect } from 'react-redux';
import { removeTopic } from '../actions';
import Entries from '../components/Entries';

const mapStateToProps = state => {
  return {
    entries: state.entries,
    expandedEntryIds: state.expandedEntryIds,
    prevDate: state.prevDate,
    nextDate: state.nextDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

const VEntries = connect(
  mapStateToProps,
  mapDispatchToProps
)(Entries);

export default VEntries;
