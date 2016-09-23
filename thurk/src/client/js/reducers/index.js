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

const initialState = {
  pages: R.map(p => {
    return {
      pNum: p,
      selected: p === 1
    };
  }, R.range(1, 15))
};

export const mbApp = (state = initialState, action) => {
  switch(action.type) {
  case 'CHANGE_PAGE':
    return Object.assign({}, state, { pages: selectPage(action.pNum, state.pages) });
  default:
    return state;
  };
};
