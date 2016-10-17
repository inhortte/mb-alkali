'use strict';

import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface('http://localhost:3033/gql', {
  headers: {
    'Content-Type': "application/json"
  }
});
const apolloClient = new ApolloClient({
  shouldBatch: true,
  networkInterface
});

export default apolloClient;
