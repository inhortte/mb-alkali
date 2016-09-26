'use strict';

import R from 'ramda';
import React from 'react';

const HeadWithinTheThorax = ({ pages, currentPage, hasPrevPageLink, hasNextPageLink, changePage }) => {
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

export default HeadWithinTheThorax;
