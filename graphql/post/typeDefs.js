const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    hello: String!
  }
`;

module.exports = typeDefs;
