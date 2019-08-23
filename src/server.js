const config = require('../config');
const logger = require('./helpers/logger');
const { ApolloServer } = require('apollo-server-express');
const GraphQL = require('./graphql');
const models = require('./models');

const server = new ApolloServer({
  typeDefs: GraphQL.typeDefs,
  resolvers: GraphQL.resolvers,
  context: async ({ req }) => {
    return {
      models,
      req,
    };
  },
});

const app = require('./app');

server.applyMiddleware({ app });

// Here you set the PORT and IP of the server
const port = config.PORT || 8001;
const ip = config.IP || '127.0.0.1';

app.listen({ port, ip }, () =>
  logger.info(`🚀 Server ready at http://${ip}:${port}${server.graphqlPath}`),
);
