'use strict';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { contentServer } from '../config';

const networkInterface = createNetworkInterface(`${contentServer()}/gql`, {
  headers: {
    'Content-Type': "application/json"
  }
});
const apolloClient = new ApolloClient({
  shouldBatch: true,
  networkInterface
});

export default apolloClient;
