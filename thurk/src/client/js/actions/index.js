'use strict';

import R from 'ramda';
import { contentServer, entriesPerPage } from '../config';
import { currentPage } from '../utils';

export const selectPage = pNum => {
  return { type: 'SELECT_PAGE', pNum };
};
export const setPages = pageCount => {
  return { type: 'SET_PAGES', pageCount };
};
export const setTopics = topics => {
  return { type: 'SET_TOPICS', topics };
};
export const setEntries = entries => {
  return { type: 'SET_ENTRIES', entries };
};
export const tfChange = fText => {
  return { type: 'TOPIC_FILTER_CHANGE', fText };
};
export const sChange = sText => {
  return { type: 'SEARCH_CHANGE', sText };
};
export const addTopic = topic => {
  return { type: 'ADD_TOPIC', topic };
};
export const removeTopic = topic => {
  return { type: 'REMOVE_TOPIC', topic };
};
export const toggleExpand = entryId => {
  return { type: 'TOGGLE_EXPAND', entryId };
};
export const toggleSidebar = () => {
  return { type: 'TOGGLE_SIDEBAR' };
};
export const showSidebar = () => {
  return { type: 'SHOW_SIDEBAR' };
};
export const hideSidebar = () => {
  return { type: 'HIDE_SIDEBAR' };
};
export const setSurroundingDates = ({ prevDate, nextDate }) => {
  return { type: 'SET_SURROUNDING_DATES', prevDate: prevDate, nextDate: nextDate };
};

/*
 * THUNKS
 */

const fetchUm = (route, data = null) => {
  let protocol = 'http';
  if(document.URL.match(/thinklikeamink/)) {
    protocol = 'https';
  }
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  let reqOpts = {
    method: 'POST',
    headers: headers,
    cache: 'default'
  };
  if(data) {
    reqOpts['body'] = JSON.stringify(data);
  }
  let req = new Request(`${protocol}://${contentServer()}/${route}`, reqOpts);
  return fetch(req);
};

export const changePage = (page = 1) => (dispatch, getState) => {
  dispatch(selectPage(page));
  dispatch(fetchEntries());
};
export const addTopicThunk = topic => (dispatch, getState) => {
  dispatch(addTopic(topic));
  dispatch(fetchPageCount());
  dispatch(fetchEntries());
};
export const removeTopicThunk = topic => (dispatch, getState) => {
  dispatch(removeTopic(topic));
  dispatch(fetchPageCount());
  dispatch(fetchEntries());
};

export const fetchPageCount = (page = 1) => (dispatch, getState) => {
  let data = {
    topicIds: R.compose(R.map(t => t.id), R.values)(getState().curTopics),
    search: getState().search
  };
  fetchUm('count', data).then(res => {
    return res.json();
  }).then(json => {
    // console.log(`fetchPageCount count: ${json.count}`);
    let pages = Math.floor(json.count / entriesPerPage) + 2;
    if(json.count % entriesPerPage === 0) {
      pages--;
    }
    dispatch(setPages(pages)); 
    dispatch(changePage(page));
  }).catch(err => {
    console.log(`fetch count err: ${err}`);
    throw err;
  });
};

export const fetchTopics = (init = false) => (dispatch, getState) => {
  fetchUm('topics').then(res => {
    return res.json();
  }).then(json => {
    dispatch(setTopics(R.sort((a, b) => b.count - a.count, json.topics)));
    if(init) {
      dispatch(tfChange(''));
    }
  }).catch(err => {
    console.log(`fetch topics err: ${err}`);
  });
};

export const fetchEntries = () => (dispatch, getState) => {
  let page = currentPage(getState().pages);
  // console.log(`pages: ${JSON.stringify(getState().pages)}`);
  // console.log(`fetchEntries page: ${page}`);
  let data = {
    topicIds: R.compose(R.map(t => t.id), R.values)(getState().curTopics),
    search: getState().search
  };
  console.log(`fetchEntries data: ${JSON.stringify(data)}`);
  fetchUm(`entry/${page}`, data).then(res => {
    return res.json();
  }).then(json => {
    dispatch(setEntries(json.entries));
  }).catch(err => {
    console.log(`fetch entries err: ${err}`);
    throw err;
  });
};

export const fetchDateEntry = (y, m, d) => (dispatch, getState) => {
  fetchUm(`entry/${y}/${m}/${d}`).then(res => {
    return res.json();
  }).then(json => {
    dispatch(setEntries(json.entries));
  }).catch(err => {
    console.log(`fetch date entry err: ${err}`);
    throw err;
  });
};

export const fetchSurroundingDates = timestamp => (dispatch, getState) => {
  fetchUm(`alrededores/${timestamp}`).then(res => {
    return res.json();
  }).then(json => {
    // console.log(`fetchSurroundingDates: ${JSON.stringify(json)}`);
    dispatch(setSurroundingDates(json.alrededores));
  }).catch(err => {
    console.log(`fetch surrounding dates err: ${err}`);
    throw err;
  });
};
