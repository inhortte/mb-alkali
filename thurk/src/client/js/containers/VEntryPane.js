import R from 'ramda';
import { connect } from 'react-redux';
import EntryPane from '../components/EntryPane';
import { analPageNumbers, currentPage } from '../utils';
import { maxPageNumbersToDisplay } from '../config';
import { changePage } from '../actions';
import { sbToggle } from '../external/sidebar';

const mapStateToProps = (state, ownProps) => {
  return {
    eFormat: state.eFormat
  };
};

const mapDispatchToProps = dispatch => {
};

const VEntryPane = connect(
  mapStateToProps
)(EntryPane);

export default VEntryPane;
