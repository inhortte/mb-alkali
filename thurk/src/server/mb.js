'use strict';

import R from 'ramda';
import path from 'path';
import Hapi from 'hapi';
import Nes from 'nes';
import Good from 'good';
import Inert from 'inert';
import { getPageCount, getTopics, getEntries, getEntriesBySearch, getEntriesByDate } from './swag';

/*
 * Web / API server
 */

const port = process.env.MARTENBLOG_PORT || 3033;
const server = new Hapi.Server({});
server.connection({ port: port});
server.register(Inert, () => {});
server.register({
  register: require('hapi-cors')
});

server.register({
  register: Good,
  options: {
    ops: { interval: 1000 },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public',
      redirectToSlash: true,
      index: true
    }
  }
});

server.register(Nes, err => {
  if(err) {
    console.log(`Nes does not like you, vole: ${err}`);
    throw err;
  }
  server.route({
    method: 'POST',
    path: '/count',
    handler: (req, reply) => {
      let searchText = (req.payload && req.payload.search) || null;
      let topicIds = (req.payload && req.payload.topicIds) || null;
      getPageCount(searchText, topicIds).then(pc => {
	reply({ count: pc });
      });
    }
  });
  server.route({
    method: 'POST',
    path: '/topics',
    handler: (req, reply) => {
      getTopics().then(topics => {
	reply({ topics: R.map(t => {
	  return {
	    id: t._id,
	    topic: t.topic,
	    count: t.entry_ids.length
	  };
	}, topics)});
      });
    }
  });
  server.route({
    method: 'POST',
    path: '/entry/{y}/{m}/{d}',
    handler: (req, reply) => {
      let { y, m, d } = req.params;
      getEntriesByDate(req.params).then(entries => {
	reply({ entries: entries });
      });
    }
  });
  server.route({
    method: 'POST',
    path: '/entry/{page?}',
    handler: (req, reply) => {
      let topicIds = (req.payload && req.payload.topicIds) || null;
      let search = (req.payload && req.payload.search) || null;
      console.log(`payload: ${JSON.stringify(req.payload)}`);
      getEntries(req.params.page || 1, topicIds, search).then(entries => {
	reply({ entries: entries });
      });
    }
  });
});

server.start(err => {
  console.log('Martenblog is puttering at ', server.info.uri, err ? err : '');
});

