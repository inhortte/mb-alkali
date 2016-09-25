'use strict';

import R from 'ramda';
import React from 'react';
import VEntry from '../containers/VEntry';

const Entries = ({ entries, expandedEntryIds }) => {
  let entryViews = R.map(e => {
    let expanded = expandedEntryIds.includes(e._id);
    return <VEntry key={e._id} entry={e} expanded={expanded} />;
  }, entries);
  return (
    <div id="entries">
      {entryViews}
    </div>
  );
};

export default Entries;


