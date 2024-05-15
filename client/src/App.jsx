//import './App.css';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';
import Header from './components/Header';
import Navi from './components/Navi';
import Footer from './components/Footer';

//import dotenv from 'dotenv';
//dotenv.config();

//import 'antd/dist/antd.css';
//import Footer from 'antd/lib/footer';

////////////////////////////////////////////////////////////////////

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <StoreProvider>

          <Header />

          <Navi />
          <Nav />
          <Outlet />

          <Footer />

        </StoreProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
