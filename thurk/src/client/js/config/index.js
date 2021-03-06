'use strict';

import { Enum } from 'enumify';

export const contentServer = () => {
  let url = document.URL;
  if(url.match(/thinklikeamink/)) {
    return 'https://blog.thinklikeamink.net';
  } else {
    return 'http://localhost:3033';
  }
};

export const sidebarId = 'martenblog-sidebar';
export const contentId = 'martenblog-content';
export const layoutContainerId = 'martenblog-layout-container';
export const layoutContainerSidebarClass = 'layout-sidebar-r3-md-up';
export const entriesId = 'entries';
export const maxPageNumbersToDisplay = document.documentElement.clientWidth < 992 ? 5 : 12;
export const entriesPerPage = 11;

export const dateTimeOpts = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};
export const dateOpts = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};

export class EFormats extends Enum {}
EFormats.initEnum(['BY_PAGE', 'BY_DATE']);
