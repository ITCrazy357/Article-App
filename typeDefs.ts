export const typeDefs = /* GraphQL */ `
  type Article {
    id: ID!
    title: String!
    avatar: String
    description: String
  }
  type Query {
    hello: String
    getListArticles: [Article]
    getArticles(id: ID!): Article
  }
`;
