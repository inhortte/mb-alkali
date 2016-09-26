'use strict';

import R from 'ramda';
import React from 'react';
import VEntries from '../containers/VEntries';
import VDateEntry from '../containers/VDateEntry';
import VDateHead from '../containers/VDateHead';
import VHeadWithinTheThorax from '../containers/VHeadWithinTheThorax';
import { EFormats } from '../config';

const EntryPane = ({ eFormat }) => {
  let headWithinTheThorax = eFormat === EFormats.BY_DATE ? <VDateHead /> : <VHeadWithinTheThorax />;
  let entries = eFormat === EFormats.BY_DATE ? <VDateEntry /> : <VEntries />;
  return (
    <div>
      {headWithinTheThorax}
      {entries}
    </div>
  );
};

export default EntryPane;
