import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  makeVar,
  createHttpLink,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import { LOCALSTORAGE_TOKEN } from './constants';
import { setContext } from '@apollo/client/link/context';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token)); //false because token is not set yet and not null because of Boolean
export const authToken = makeVar(token); //null because token is not available

const httpLink = createHttpLink({
  uri:
    process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-jwt': authToken() || '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authToken();
            },
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <ApolloProvider client={client}>
//     <React.StrictMode>
//       <HelmetProvider>
//         <App />
//       </HelmetProvider>
//     </React.StrictMode>
//   </ApolloProvider>
// );
