'use strict';

import R from 'ramda';
import { graphql,
	 GraphQLSchema,
	 GraphQLObjectType,
	 GraphQLInt,
	 GraphQLFloat,
	 GraphQLString,
	 GraphQLList,
	 GraphQLNonNull
       } from 'graphql';
import { entriesByTopic,
	 topicsByEntry,
	 userByEntry,
	 entriesByUser,
	 pCount,
	 topics,
	 entriesByDate,
	 entries,
	 alrededores} from './gqlSwag';

const Topic = new GraphQLObjectType({
  name: 'Topic',
  description: 'This is where you reduce everything you may have said to a single word',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    topic: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'A distillation of your dream'
    },
    count: { type: GraphQLInt },
    entries: {
      type: new GraphQLList(Entry),
      description: 'A number of entries for a topic',
      resolve: topic => entriesByTopic(topic._id)
    }
  })
});

const Entry = new GraphQLObjectType({
  name: 'Entry',
  description: 'Endless blatherings',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    entry: {
      type: new GraphQLNonNull(GraphQLString)
    },
    subject: {
      type: new GraphQLNonNull(GraphQLString)
    },
    topics: {
      type: new GraphQLList(Topic),
      description: 'Distillations of blatherings',
      resolve: entry => topicsByEntry(entry._id)
    },
    user: {
      type: User,
      description: 'The decrepit creature who blathered',
      resolve: entry => userByEntry(entry._id)
    }
  })
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'The vagrant who blathered',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLInt) },
    createdAt: { type: new GraphQLNonNull(GraphQLFloat) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    entries: {
      type: new GraphQLList(Entry),
      description: 'Průjem',
      resolve: user => entriesByUser(user._id)
    }
  })
});

const Alrededores = new GraphQLObjectType({
  name: 'Alrededores',
  description: 'Two timestamps (64 bit floats) representing dates',
  fields: () => ({
    prevDate: { type: GraphQLFloat },
    nextDate: { type: GraphQLFloat }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    castrate: {
      type: GraphQLString,
      args: {
	thurk: { type: GraphQLString }
      },
      resolve: (source, { thurk }) => `${thurk} must DIE!`
    },
    topics: {
      type: new GraphQLList(Topic),
      description: 'All topics, vole',
      resolve: (source) => topics()
    },
    pCount: {
      type: GraphQLInt,
      description: 'The number of, ahem, pages',
      args: {
	topicIds: { type: new GraphQLList(GraphQLInt) },
	search: { type: GraphQLString }
      },
      resolve: (source, { topicIds, search }) => pCount(topicIds, search)
    },
    entriesByDate: {
      type: new GraphQLList(Entry),
      description: 'Every blathering within a terrestrial day',
      args: {
	y: { type: GraphQLInt }, m: { type: GraphQLInt }, d: { type: GraphQLInt }
      },
      resolve: (source, { y, m, d }) => entriesByDate(y, m, d)
    },
    entries: {
      type: new GraphQLList(Entry),
      description: 'A solid hunk of blatherings',
      args: {
	page: { type: GraphQLInt },
	limit: { type: GraphQLInt },
	topicIds: { type: new GraphQLList(GraphQLInt) },
	search: { type: GraphQLString }
      },
      resolve: (source, { page, limit, topicIds, search }) => entries(page, limit, topicIds, search)
    },
    alrededores: {
      type: Alrededores,
      description: 'The two surrounding relevant dates',
      args: {
	timestamp: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      resolve: (source, { timestamp }) => alrededores(timestamp)
    }
  })
});

const MartenSchema = new GraphQLSchema({
  query: Query,
  types: [ Topic, Entry, User, Alrededores ]
});

export default MartenSchema;
