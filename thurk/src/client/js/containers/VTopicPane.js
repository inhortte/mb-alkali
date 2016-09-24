import R from 'ramda';
import { connect } from 'react-redux';
import TopicPane from '../components/TopicPane';
import { tfChange } from '../actions';

const mapStateToProps = state => {
  return {
    filteredTopics: state.filteredTopics,
    curTopics: state.curTopics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    topicFilterChange: e => dispatch(tfChange(e.target.value))
  };
};

const VTopicPane = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPane);

export default VTopicPane;
