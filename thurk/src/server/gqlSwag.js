'use strict';

import 'babel-polyfill';
import R from 'ramda';
import { MongoClient } from 'mongodb';
import { mongoUrl, entriesPerPage } from './config';

const mongoConnect = () => {
  return MongoClient.connect(mongoUrl);
};

const tuneEntries = entries => {
  return R.map(entry => {
    let { created_at } = entry;
    return R.merge(R.clone(entry), { createdAt: created_at });
  }, entries);
};

const mkFindOpts = (topicIds = null, search = null) => {
  if(!topicIds && !search) {
    return {};
  } else {
    let topicOpts, searchOpts;
    if(topicIds && topicIds.length > 0) {
      let orArr =  R.map(id => {
	return { topic_ids: { $elemMatch: { $eq: id }}};
      }, topicIds);
      topicOpts = { $or: orArr };
    }
    if(search && search.trim().length > 0) {
      searchOpts = { $or: [{ subject: { $regex: search.trim(), $options: 'i' }},
			   { entry: { $regex: search.trim(), $options: 'i' }}]};
    }
    if(topicOpts && searchOpts) {
      return { $and: [ topicOpts, searchOpts ] };
    } else {
      return topicOpts || searchOpts;
    }
  }
};

export const entriesByTopic = (topicId, page = 1, limit = entriesPerPage) => new Promise(resolve => {
  let db;
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('entry');
    let query = { topic_ids: { $elemMatch: { $eq: topicId }}};
    return coll.find(query)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
  }).then(entries => {
    db.close(true);
    resolve(tuneEntries(entries));
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err});
  });
});

export const topicsByEntry = entryId => new Promise(resolve => {
  let db;
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('topic');
    let query = { entry_ids: { $elemMatch: { $eq: entryId }}};
    return coll.find(query).toArray();
  }).then(topics => {
    db.close(true);
    resolve(topics);
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});

export const userByEntry = entryId => new Promise(resolve => {
  let db;
  mongoConnect().then(_db => {
    db = _db;
    let entryColl = db.collection('entry');
    return entryColl.findOne({ _id: entryId }, { fields: { user_id: 1 }});
  }).then(userId => {
    let userColl = db.collection('user');
    return userColl.findOne({ _id: userId });
  }).then(user => {
    db.close(true);
    resolve(user);
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});

export const entriesByUser = (userId, page = 1, limit = entriesPerPage) => new Promise(resolve => {
  let db;
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('entry');
    return coll.find({ user_id: userId })
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
  }).then(entries => {
    db.close(true);
    resolve(tuneEntries(entries));
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err});
  });
});

export const pCount = (topicIds = null, search = null) => new Promise(resolve => {
  let db;
  let findOpts = mkFindOpts(topicIds, search);
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

export const topics = () => new Promise((resolve) => {
  let db;
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('topic');
    return coll.find({}).sort({ topic: 1 }).toArray();
  }).then(topics => {
    db.close(true);
    resolve(topics);
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});

export const entriesByDate = (y, m, d) => new Promise(resolve => {
  let db;
  let beginTime = new Date(y, m - 1, d).getTime();
  let endTime = beginTime + 1000 * 3600 * 24;
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('entry');
    return coll.find({ $and: [{ created_at: { $gte: beginTime }}, { created_at: { $lte: endTime }}]})
      .sort({ created_at: -1 })
      .toArray();
  }).then(entries => {
    db.close(true);
    resolve(tuneEntries(entries.reverse()));
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});

export const entries = (page = 1, limit = entriesPerPage, topicIds = null, search = null) => new Promise(resolve => {
  let db;
  let findOpts = mkFindOpts(topicIds, search);
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('entry');
    return coll.find(findOpts)
      .sort({ created_at: -1 })
      .skip((page - 1)* limit)
      .limit(limit)
      .toArray();
  }).then(entries => {
    db.close(true);
    resolve(tuneEntries(entries));
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});

export const alrededores = timestamp => new Promise(resolve => {
  let db;
  let date = new Date(parseInt(timestamp));
  let dayBegins = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  let dayEnds = dayBegins + 1000 * 3600 * 24 - 1;
  let prevDate, nextDate;
  mongoConnect().then(_db => {
    db = _db;
    let coll = db.collection('entry');
    return coll.find({ created_at: { $lt: dayBegins }}).sort({ created_at: -1 }).limit(1).toArray();
  }).then(entries => {
    if(entries && entries[0]) {
      prevDate = entries[0].created_at;
    }
    let coll = db.collection('entry');
    return coll.find({ created_at: { $gt: dayEnds }}).sort({ created_at: 1 }).limit(1).toArray();
  }).then(entries => {
    if(entries && entries[0]) {
      nextDate = entries[0].created_at;
    }
    resolve({ prevDate: prevDate, nextDate: nextDate });
  }).catch(err => {
    console.log(`err: ${err}`);
    resolve({ err: err });
  });
});
