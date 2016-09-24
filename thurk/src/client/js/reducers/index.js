'use strict';

import R from 'ramda';
import { maxPageNumbersToDisplay } from '../config';

const selectPage = (pNum, pages) => {
  return R.map(p => {
    return {
      pNum: p.pNum,
      selected: p.pNum === pNum
    };
  }, pages);
};

const mkPages = pageCount => {
  return R.map(p => {
    return {
      pNum: p,
      selected: p === 1
    };
  }, R.range(1, pageCount));
};

const filterTopics = (fText, topics) => {
  console.log(`there are ${topics.length} topics`);
  let re = new RegExp(fText.trim(), 'i');
  return (R.trim(fText).length === 0 && topics) || R.filter(t => re.test(t.topic), topics);
};

const addTopic = (topic, _curTopics) => {
  let curTopics = R.clone(_curTopics);
  curTopics[topic.topic] = topic;
  console.log(`curTopics: ${JSON.stringify(curTopics)}`);
  return curTopics;
};
const removeTopic = (topic, _curTopics) => {
  let curTopics = R.clone(_curTopics);
  delete curTopics[topic.topic];
  return curTopics;
};

const initialState = {
  pages: mkPages(15),
  topics: [],
  filteredTopics: [],
  curTopics: {}
};

export const mbApp = (state = initialState, action) => {
  switch(action.type) {
  case 'CHANGE_PAGE':
    return Object.assign({}, state, { pages: selectPage(action.pNum, state.pages) });
  case 'SET_PAGES':
    return Object.assign({}, state, { pages: mkPages(action.pageCount) });
  case 'SET_TOPICS':
    return Object.assign({}, state, { topics: action.topics });
  case 'TOPIC_FILTER_CHANGE':
    return Object.assign({}, state, { filteredTopics: filterTopics(action.fText, state.topics) });
  case 'ADD_TOPIC':
    return Object.assign({}, state, { curTopics: addTopic(action.topic, state.curTopics) });
  case 'REMOVE_TOPIC':
    return Object.assign({}, state, { curTopics: removeTopic(action.topic, state.curTopics) });
  default:
    return state;
  };
};
