'use strict';

import 'babel-polyfill';
import R from 'ramda';
import { react, Div, Button, Nav, UL, LI, Anchor, Item, Span, P } from 'alkali';
import { sbToggle } from '../external/sidebar';
import { pages, pagesTrunc, currentPage } from '../variables';

const PageLis = (pages, currentPage) => {
  let mapIndexed = R.addIndex(R.map);
  let prev = [ LI('', [ Anchor('', { href: '#', 'aria-label': "Previous" },
			       [ Span('', { 'aria-hidden': true, content: '&laquo;' }) ]) ]) ];
  let middle = R.map(pNum => {
    let liClass = react(function* () {
      let cp = yield currentPage;
      return pNum === cp ? '.active' : '';
    });
    return LI(liClass, [ Anchor('', {
      href: '#',
      content: pNum,
      onClick(e) {
	currentPage.put(pNum);
      }
    }) ]);
  }, pages.valueOf().default);
  let next = [ LI('', [ Anchor('', { href: '#', 'aria-label': "Next" },
			       [ Span('', { 'aria-hidden': true, content: '&raquo;' }) ]) ]) ];
  return prev.concat(middle).concat(next);
};

class HeadWithinTheThorax extends Div('.col-md-12', [
  Div('.col-md-10', [
    Nav('', [
      UL('.pagination', {
	content: pagesTrunc.map(p => {
	  let liClass = p.selected ? '.active' : '';
	  return LI(liClass.valueOf(), [ Anchor('', {
	    href: '#',
	    content: p.pNum,
	    onclick(e) {
	      pages.select(p.pNum);
	      currentPage.put(p.pNum);
	    }
	  }) ]);
	})
      })
    ])
    /*
    Nav('', [
      UL('.pagination', PageLis(Pages, CurrentPage))
    ])
    */
  ]),
  Button('.col-md-1.col-md-push-1.btn.btn-info', {
    content: 'Topics',
    onclick(e) {
      console.log(`clicking?`);
      sbToggle();
    }
  })
]) { }

class EntryPane extends Div('', [
  HeadWithinTheThorax
]) { }

export default EntryPane;
