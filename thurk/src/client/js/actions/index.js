'use strict';

import R from 'ramda';
import { contentServer, entriesPerPage } from '../config';

export const changePage = pNum => {
  return { type: 'CHANGE_PAGE', pNum };
};
export const setPages = pageCount => {
  return { type: 'SET_PAGES', pageCount };
};
export const setTopics = topics => {
  return { type: 'SET_TOPICS', topics };
};
export const tfChange = fText => {
  return { type: 'TOPIC_FILTER_CHANGE', fText };
};
export const addTopic = topic => {
  return { type: 'ADD_TOPIC', topic };
};
export const removeTopic = topic => {
  return { type: 'REMOVE_TOPIC', topic };
};

/*
 * THUNKS
 */

const fetchUm = route => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  let req = new Request(`http://${contentServer()}/${route}`, {
    method: 'POST',
    headers: headers,
    cache: 'default'
  });
  return fetch(req);
};

export const fetchPageCount = () => (dispatch, getState) => {
  fetchUm('count').then(res => {
    return res.json();
  }).then(json => {
    console.log(`count: ${json.count}`);
    let pages = Math.floor(json.count / entriesPerPage) + 2;
    if(json.count % entriesPerPage === 0) {
      pages--;
    }
    dispatch(setPages(pages)); 
    dispatch(changePage(pages - 1));
  }).catch(err => {
    console.log(`fetch count err: ${err}`);
    throw err;
  });
};

export const fetchTopics = (init = false) => (dispatch, getState) => {
  fetchUm('topics').then(res => {
    return res.json();
  }).then(json => {
    console.log(`fetched ${json.topics.length} topics`);
    dispatch(setTopics(json.topics));
    if(init) {
      dispatch(tfChange(''));
    }
  }).catch(err => {
    console.log(`fetch topics err: ${err}`);
  });
};
