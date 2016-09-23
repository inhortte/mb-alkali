'use strict';

import R from 'ramda';
import React from 'react';
import { sbToggle } from '../external/sidebar';

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

/*
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
  ]),
  Button('.col-md-1.col-md-push-1.btn.btn-info', {
    content: 'Topics',
    onclick(e) {
      console.log(`clicking?`);
      sbToggle();
    }
  })
]) { }
*/

const HeadWithinTheThorax = ({ pages, currentPage, hasPrevPageLink, hasNextPageLink, changePage, sbToggle }) => {
  let prevPageThurk = hasPrevPageLink ?
      <li><a href="#" aria-label="Previous" onClick={() => changePage(currentPage - 1)}><span aria-hidden="true">&laquo;</span></a></li> :
      '';
  let pageThurks = R.map(p => {
    let liClass = p.selected ? 'active' : '';
    return <li className={liClass} key={p.pNum}><a href="#" onClick={() => changePage(p.pNum)}>{p.pNum}</a></li>;
  }, pages);
  let nextPageThurk = hasNextPageLink ?
      <li><a href="#" aria-label="Next" onClick={() => changePage(currentPage + 1)}><span aria-hidden="true">&raquo;</span></a></li> :
      '';
  return (
    <div className="col-md-12">
      <div className="col-md-10">
	<nav>
	  <ul className="pagination">
	    {prevPageThurk}
	    {pageThurks}
	    {nextPageThurk}
	  </ul>
	</nav>
      </div>
      <button className="col-md-1 col-md-push-1 btn btn-info" onClick={sbToggle}>
	Topics
      </button>
    </div>
  );
};

const EntryPane = ({ pages, currentPage, hasPrevPageLink, hasNextPageLink, changePage, sbToggle }) => {
  return (
    <HeadWithinTheThorax pages={pages} currentPage={currentPage} hasPrevPageLink={hasPrevPageLink} hasNextPageLink={hasNextPageLink} changePage={changePage} sbToggle={sbToggle} />
  );
};

export default EntryPane;
