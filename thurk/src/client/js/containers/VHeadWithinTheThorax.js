import R from 'ramda';
import { connect } from 'react-redux';
import HeadWithinTheThorax from '../components/HeadWithinTheThorax';
import { analPageNumbers, currentPage } from '../utils';
import { maxPageNumbersToDisplay } from '../config';
import { changePage } from '../actions';
import { sbToggle } from '../external/sidebar';

const mapStateToProps = (state, ownProps) => {
  let pages = analPageNumbers(state.pages);
  let cp = currentPage(state.pages);
  return {
    pages: pages,
    currentPage: cp,
    hasPrevPageLink: cp > 1,
    hasNextPageLink: cp < state.pages.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: pNum => dispatch(changePage(pNum))
  };
};

const VHeadWithinTheThorax = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadWithinTheThorax);

export default VHeadWithinTheThorax;
