'use strict';

export const contentServer = () => {
  let url = document.URL;
  if(url.match(/thinklikeamink/)) {
    return 'blog.thinklikeamink.net';
  } else {
    return 'localhost:3033';
  }
};

export const sidebarId = 'martenblog-sidebar';
export const contentId = 'martenblog-content';
export const layoutContainerId = 'martenblog-layout-container';
export const layoutContainerSidebarClass = 'layout-sidebar-r3-md-up';
export const entriesId = 'entries';
export const maxPageNumbersToDisplay = 8;
export const entriesPerPage = 11;
