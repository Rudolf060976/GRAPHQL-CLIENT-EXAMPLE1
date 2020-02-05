import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App3 from './App3';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from '@apollo/react-hooks';


import initialState from './local-state/initial-state';
import schema from './local-state/schema';
import resolvers from './local-state/resolvers';


const cache = new InMemoryCache();

const link = createUploadLink({
      uri: 'http://localhost:8000/graphql',
      credentials: 'same-origin'
    });
 
const client = new ApolloClient({
	cache,
	link,
	typeDefs: schema,
	resolvers
});

cache.writeData({

	data: initialState

});

client.onResetStore(() => client.writeData({ data: initialState }));

/*

client.query({
	query: gql`
	
	query {
  		getAllBooks {
   			nodes {
      			id
      			title
      			author {
        		name
      			}
      
    		}
  		}
	}`
}).then(result => console.log(JSON.stringify(result, null, 2)));

*/

ReactDOM.render(
	<ApolloProvider client={client}>
		<App3 />
	</ApolloProvider>,
	document.getElementById('root')
);
	
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
