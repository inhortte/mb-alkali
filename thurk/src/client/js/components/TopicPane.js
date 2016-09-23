'use strict';

import { Div, H3, Input } from 'alkali';

const searchPlaceholders = [
  'Kill Christián', 'Shave your goat', 'The bog encroaches', 'Mrdat', 'Dissolving Petuitary',
  'I snorted your lamp', 'Stapleguns aloft', 'Excoriate the woman'
];

class TopicPane extends Div('.container-fluid', { margin: '20px 0 0 10px' }, [
  Div('.sidebar-block.sidebar-brand-border.sidebar-p-y,form-group', [
    H3('', { content: 'Search' }),
    Input('.form-control', {
      type: 'text',
      autofocus: true,
      placeholder: searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)]
    })
  ]),
  Div('.sidebar-block.sidebar-brand-border.sidebar-p-y.form-group', [
    H3('', { content: 'Topics' }),
    Input('.form-control', {
      type: 'text',
      placeholder: searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)]
    })
  ])
]) { }

export default TopicPane;
