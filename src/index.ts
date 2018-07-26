import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const data = [
  { name: 'mario_0', display: 'Mario', releaseDate: '1970-01-01', series: { name: 'super_mario_bros', display: 'Super Mario Bros.'}}
];

const typeDefs   = gql`
type Amiibo {
  name: ID!
  display: String!
  releaseDate: String
  series: AmiiboSeries
}

type AmiiboSeries {
  name: ID!
  display: String!
}

type Query {
  message: String
  amiibos: [Amiibo]
  amiibo(name: String!): Amiibo
}

input AmiiboInput {
  name: String!
  display: String!
  releaseDate: String
  series: AmiiboSeriesInput
}

input AmiiboSeriesInput {
  name: String!
  display: String!
}

type Mutation {
  saveAmiibos(amiibos: [AmiiboInput]): Boolean
}`;

const resolvers = {
  Query: {
    message: () => 'Hello World!',
    amiibos: () => data,
    amiibo: (obj: any, { name }: any) => data.find(i => i.name === name)
  },
  
  Mutation: {
    saveAmiibos: (obj: any, { amiibos }: any) => {
      amiibos.forEach((amiibo: any) => {
        const existingAmiibo = data.find(i => i.name === amiibo.name);
        if (existingAmiibo) {
          Object.assign(existingAmiibo, amiibo);
        }
        else {
          data.push(amiibo);
        }
      });
      return true;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app, cors: true });
app.listen(3000, () => console.log('Listening on port 3000 :)'));
