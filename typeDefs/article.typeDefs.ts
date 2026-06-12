export const typeDefsArticle = /* GraphQL */ `
  type Article {
    id: ID!
    title: String!
    avatar: String
    description: String
    category: Category
  }

  type Query {
    getListArticles: [Article]
    getArticles(id: ID!): Article
  }

  input ArticleInput {
    title: String!
    avatar: String
    description: String
    categoryId: ID!
  }

  type Mutation {
    createArticle(input: ArticleInput!): Article
    updateArticle(id: ID!, input: ArticleInput!): String
    deleteArticle(id: ID!): String
  }
`;
