'use strict';

import R from 'ramda';
import React from 'react';
import VEntries from '../containers/VEntries';

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

const HeadWithinTheThorax = ({ pages, currentPage, hasPrevPageLink, hasNextPageLink, changePage, sbToggle }) => {
  let prevPageThurk = hasPrevPageLink ?
      <li><a href={`#/${currentPage - 1}`} aria-label="Previous" onClick={() => changePage(currentPage - 1)}><span aria-hidden="true">&laquo;</span></a></li> :
      '';
  let pageThurks = R.map(p => {
    let liClass = p.selected ? 'active' : '';
    return <li className={liClass} key={p.pNum}><a href={`#/${p.pNum}`} onClick={() => changePage(p.pNum)}>{p.pNum}</a></li>;
  }, pages);
  let nextPageThurk = hasNextPageLink ?
      <li><a href={`#/${currentPage + 1}`} aria-label="Next" onClick={() => changePage(currentPage + 2)}><span aria-hidden="true">&raquo;</span></a></li> :
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
    </div>
  );
};

const EntryPane = ({ pages, currentPage, hasPrevPageLink, hasNextPageLink, changePage, sbToggle }) => {
  let style = { overflow: 'scroll' };
  return (
    <div>
      <HeadWithinTheThorax pages={pages} currentPage={currentPage} hasPrevPageLink={hasPrevPageLink} hasNextPageLink={hasNextPageLink} changePage={changePage} sbToggle={sbToggle} />
      <VEntries />
    </div>
  );
};

export default EntryPane;
