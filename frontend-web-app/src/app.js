import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CustomerList from './CustomerList';

//GraphQL endpoint
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>ORM - Customer Management App</h1>
        <CustomerList />
      </div>
    </ApolloProvider>
  );
}

export default App;
