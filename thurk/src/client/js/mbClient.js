'use strict';

import { Div, Section, Header, H1, Image, P, Hr } from 'alkali';
import { sidebar } from 'bootstrap-layout';
import TopicPane from './components/TopicPane';
import EntryPane from './components/EntryPane';
import { sbInit } from './external/sidebar';

const bodyColors = [
  '#8b8b83', '#696969', '#cd5c5c', '#8fbc8f', '#66cdaa', '#008b8b', '#483d8b', '#cd5555', '#838b83', '#6e7b8b', '#8b7b8b'
];

class Head extends Section('#head.col-md-12', [
  Header('.col-md-12.jumbotron', [
    H1('', [
      'Martenblog'
    ]),
    P('', [
      'Here lies the Marten, eternally beneath the splintered earth.',
    ]),
    Image('.img-rounded', { src: 'images/gretel.jpg', width: 200 })
  ])
]) { }

class Thorax extends Section('#thorax.col-md-12', [
  EntryPane
]) { }

class Abdomen extends Section('#abdomen.col-md-12', [
  Hr,
  P('.well.well-sm', [
    'Along with martens and goats and the slime bog.'
  ])
]) { }

class Content extends Div('.container-fluid', [
  Head,
  Thorax,
  Abdomen
]) { }

document.getElementById('martenblog-content').appendChild(new Content());
document.getElementById('martenblog-sidebar').appendChild(new TopicPane());
document.body.style.background = bodyColors[Math.floor(Math.random() * bodyColors.length)];
sbInit();
