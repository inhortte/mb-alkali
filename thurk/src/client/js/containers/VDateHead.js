import R from 'ramda';
import { connect } from 'react-redux';
import DateHead from '../components/DateHead';
import { changePage, fetchDateEntry, fetchSurroundingDates } from '../actions';

const mapStateToProps = state => {
  return {
    curDate: state.entries && state.entries[0] && state.entries[0].createdAt,
    prevDate: state.prevDate,
    nextDate: state.nextDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    goToDate: (date, y, m, d) => {
      dispatch(fetchDateEntry(y, m, d));
      dispatch(fetchSurroundingDates(date));
    },
    changePage: pNum => dispatch(changePage(pNum))
  };
};

const VDateHead = connect(
  mapStateToProps,
  mapDispatchToProps
)(DateHead);

export default VDateHead;
