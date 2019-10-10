import {
  Environment,
  Network,
  RecordSource,
  Store as GQLStore,
} from 'relay-runtime';

import store from './index'

function fetchQuery(
  operation,
  variables,
) {
  return fetch('http://127.0.0.1:8000/auth/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + JSON.parse(localStorage.getItem("settings")).access_token
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new GQLStore(new RecordSource()),
});

export default environment;
