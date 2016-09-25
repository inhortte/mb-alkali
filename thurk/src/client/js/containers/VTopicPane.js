import R from 'ramda';
import { connect } from 'react-redux';
import TopicPane from '../components/TopicPane';
import { toggleSidebar, tfChange, sChange, fetchPageCount, fetchEntries } from '../actions';
import { sbToggle } from '../external/sidebar';

const mapStateToProps = state => {
  return {
    sbOpen: state.sbOpen,
    filteredTopics: state.filteredTopics,
    curTopics: state.curTopics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchChange: e => dispatch(sChange(e.target.value)),
    searchSubmit: e => {
      if(e && e.key === 'Enter') {
	dispatch(fetchPageCount());
	dispatch(fetchEntries());
      }
    },
    topicFilterChange: e => dispatch(tfChange(e.target.value)),
    closeSidebar: () => {
      sbToggle();
      dispatch(toggleSidebar());
    }
  };
};

const VTopicPane = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPane);

export default VTopicPane;
