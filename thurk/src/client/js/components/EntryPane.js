'use strict';

import R from 'ramda';
import React from 'react';
import VEntries from '../containers/VEntries';
import VDateEntry from '../containers/VDateEntry';
import VDateHead from '../containers/VDateHead';
import VHeadWithinTheThorax from '../containers/VHeadWithinTheThorax';

const EntryPane = ({ y, m, d }) => {
  let headWithinTheThorax = (y && m && d) ? <VDateHead /> : <VHeadWithinTheThorax />;
  let entries = (y && m && d) ? <VDateEntry y={y} m={m} d={d} /> : <VEntries />;
  return (
    <div>
      {headWithinTheThorax}
      {entries}
    </div>
  );
};

export default EntryPane;
