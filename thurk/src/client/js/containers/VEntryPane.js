import R from 'ramda';
import { connect } from 'react-redux';
import EntryPane from '../components/EntryPane';
import { analPageNumbers, currentPage } from '../utils';
import { maxPageNumbersToDisplay } from '../config';
import { changePage } from '../actions';
import { sbToggle } from '../external/sidebar';

const mapStateToProps = (state, ownProps) => {
  let pages = analPageNumbers(state.pages);
  let cp = currentPage(state.pages);
  let { y, m, d } = ownProps;
  return {
    pages: pages,
    currentPage: cp,
    hasPrevPageLink: cp > 1,
    hasNextPageLink: cp < state.pages.length,
    y: y,
    m: m,
    d: d
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: pNum => dispatch(changePage(pNum)),
    sbToggle: () => sbToggle()
  };
};

const VEntryPane = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPane);

export default VEntryPane;
