import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs   = gql(`
type Query {
  message: String
}

schema {
  query: Query
}`);

const resolvers = {
  Query: {
    message: () => 'Hello World!'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app, cors: true });
app.listen(3000, () => console.log('Listening on port 3000 :)'));
