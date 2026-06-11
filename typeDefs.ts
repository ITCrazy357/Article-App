export const typeDefs = /* GraphQL */ `
  type Article {
    id: ID!
    title: String!
    avatar: String
    description: String
  }

  type Query {
    getListArticles: [Article]
    getArticles(id: ID!): Article
  }

  input ArticleInput {
    title: String!
    avatar: String
    description: String
  }

  type Mutation {
    createArticle(input: ArticleInput!): Article
    updateArticle(id: ID!, input: ArticleInput!): String
    deleteArticle(id: ID!): String
  }
`;
