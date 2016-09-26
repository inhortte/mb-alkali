import R from 'ramda';
import { connect } from 'react-redux';
import DateHead from '../components/DateHead';

const mapStateToProps = state => {
  return {
    curDate: state.entries && state.entries[0] && state.entries[0].created_at,
    prevDate: state.prevDate,
    nextDate: state.nextDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

const VDateHead = connect(
  mapStateToProps,
  mapDispatchToProps
)(DateHead);

export default VDateHead;
