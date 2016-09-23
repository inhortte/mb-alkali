'use strict';

import { sidebar } from 'bootstrap-layout';
import { sidebarId, layoutContainerId, layoutContainerSidebarClass } from '../config';
import $ from 'jquery';

export const sbInit = () => {
  sidebar.init(`#${sidebarId}`);
};

export const sbToggle = () => {
  console.log(`toggling`);
  if($(`#${layoutContainerId}`).hasClass(layoutContainerSidebarClass)) {
    $(`#${layoutContainerId}`).removeClass(layoutContainerSidebarClass);
  } else {
    $(`#${layoutContainerId}`).addClass(layoutContainerSidebarClass);
  }
  sidebar.toggle(`#${sidebarId}`);
};
