'use strict';

import R from 'ramda';
import { maxPageNumbersToDisplay } from '../config';

export const analPageNumbers = (pagesArr) => {
  let selected = 0;
  for (let idx in pagesArr) {
    if(pagesArr[idx].selected) {
      selected = parseInt(idx);
      break;
    }
  }
  // console.log(`selected: ${selected}`);
  let start, final;
  let startPad = 0, finalPad = 0;
  let median = Math.floor(maxPageNumbersToDisplay / 2);
  if(parseInt(selected - median) < 0) {
    start = parseInt(0);
    finalPad = parseInt(median - selected);
  } else {
    start = parseInt(selected - median);
  }
  if(parseInt(selected + median) >= pagesArr.length) {
    final = parseInt(pagesArr.length - 1);
    startPad = parseInt(selected + median - pagesArr.length - 1);
  } else {
    final = parseInt(selected + median);
  }
  // console.log(`start: ${start} startPad: ${startPad} end: ${final} endPad: ${finalPad}`);
  return pagesArr.slice(start - startPad, final + finalPad + 1);
};

export const currentPage = (pagesArr) => {
  return R.find(R.propEq('selected', true))(pagesArr)['pNum'];
};
