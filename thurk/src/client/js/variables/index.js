'use strict';

import { Variable, VArray } from 'alkali';
import R from 'ramda';
import { maxPageNumbersToDisplay } from '../config';

const analPageNumbers = (pagesArr) => {
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
  console.log(typeof selected);
  if(parseInt(selected + median) >= pagesArr.length) {
    final = parseInt(pagesArr.length - 1);
    startPad = parseInt(selected + median - pagesArr.length - 1);
  } else {
    final = parseInt(selected + median);
  }
  // console.log(`start: ${start} startPad: ${startPad} end: ${final} endPad: ${finalPad}`);
  return pagesArr.slice(start - startPad, final + finalPad + 1);
};

export let pages = VArray({
  default: R.range(1, 15).map(p => {
    return {
      pNum: p,
      selected: p === 1
    };
  }),
  select(pNum) {
    let ps = this.valueOf().map(p => {
      // console.log(JSON.stringify(p));
      return {
	pNum: p.pNum,
	selected: p.pNum === pNum
      };
    });
    this.put(ps);
  },
  getPagesSlice() {
    return analPageNumbers(this.valueOf());
  }
});
export const currentPage = new Variable(1);
export const pagesTrunc = pages.to(val => analPageNumbers(val));
