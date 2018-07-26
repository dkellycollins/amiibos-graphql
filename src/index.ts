import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const data = [
  { name: 'mario_0', display: 'Mario', releaseDate: '1970-01-01', series: { name: 'super_mario_bros', display: 'Super Mario Bros.'}}
];

const typeDefs   = gql`
type Amiibo {
  name: String!
  display: String!
  releaseDate: String
  series: AmiiboSeries
}

type AmiiboSeries {
  name: String!
  display: String!
}

type Query {
  message: String
  amiibos: [Amiibo]
  amiibo(name: String!): Amiibo
}

schema {
  query: Query
}`;

const resolvers = {
  Query: {
    message: () => 'Hello World!',
    amiibos: () => data,
    amiibo: (obj: any, args: any) => data.filter(i => i.name === args.name)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app, cors: true });
app.listen(3000, () => console.log('Listening on port 3000 :)'));
