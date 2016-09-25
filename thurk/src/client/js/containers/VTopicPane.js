import R from 'ramda';
import { connect } from 'react-redux';
import TopicPane from '../components/TopicPane';
import { tfChange, sChange, fetchEntries } from '../actions';

const mapStateToProps = state => {
  return {
    filteredTopics: state.filteredTopics,
    curTopics: state.curTopics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchChange: e => dispatch(sChange(e.target.value)),
    searchSubmit: e => {
      if(e && e.key === 'Enter') {
	dispatch(fetchEntries());
      }
    },
    topicFilterChange: e => dispatch(tfChange(e.target.value))
  };
};

const VTopicPane = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPane);

export default VTopicPane;
