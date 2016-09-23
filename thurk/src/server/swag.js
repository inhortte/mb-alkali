'use strict';

import 'babel-polyfill';
import R from 'ramda';
import { MongoClient } from 'mongodb';
import { mongoUrl, entriesPerPage } from './config';

const mongoConnect = () => {
  return MongoClient.connect(mongoUrl);
};

const mkFindOpts = (topicIds = null, searchText = null) => {
  if(!topicIds && !searchText) {
    return {};
  } else {
    let topicOpts, searchOpts;
    if(topicIds) {
      let orArr =  R.map(id => {
	return { topic_ids: { $elemMatch: { $eq: id }}};
      }, topicIds);
      topicOpts = { $or: orArr };
    }
    if(searchText) {
      searchOpts = { $or: [{ subject: { $regex: searchText, $options: 'i' }}, { entry: { $regex: searchText, $options: 'i' }}]};
    }
    if(topicIds && searchText) {
      return { $and: [ topicOpts, searchOpts ] };
    } else {
      return topicOpts || searchOpts;
    }
  }
};

export const getPageCount = (searchText = null, topicIds = null) => new Promise((resolve) => {
  let db;
  let findOpts = mkFindOpts(topicIds, searchText);
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('entry');
    return coll.count(findOpts);
  }).then(count => {
    db.close(true);
    resolve(count);
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});

export const getTopics = () => new Promise((resolve) => {
  let db;
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('topic');
    return coll.find({}).sort({ topic: 1 }).toArray();
  }).then(topics => {
    console.log(`topics: ${JSON.stringify(topics.length)}`);
    db.close(true);
    resolve(topics);
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});

export const getEntries = (page = 1, topicIds = null) => new Promise((resolve) => {
  let db;
  let findOpts = mkFindOpts(topicIds);
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('entry');
    return coll.find(findOpts).skip((page - 1)* entriesPerPage).limit(entriesPerPage).toArray();
  }).then(entries => {
    db.close(true);
    resolve(entries);
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});

export const getEntriesByDate = ({ y, m, d }) => new Promise((resolve) => {
  let db;
  let beginTime = new Date(y, m - 1, d).getTime();
  let endTime = beginTime + 1000 * 3600 * 24;
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('entry');
    return coll.find({ $and: [{ created_at: { $gte: beginTime }}, { created_at: { $lte: endTime }}]}).toArray();
  }).then(entries => {
    db.close(true);
    resolve(entries.reverse());
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});

export const getEntriesBySearch = (text, page = 1, topicIds = null) => new Promise((resolve) => {
  let db;
  let findOpts = mkFindOpts(topicIds, text);  
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('entry');
    return coll.find(findOpts)
      .skip((page - 1) * entriesPerPage)
      .limit(entriesPerPage)
      .toArray();
  }).then(entries => {
    db.close();
    resolve(entries);
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});