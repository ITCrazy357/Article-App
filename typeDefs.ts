export const typeDefs = /* GraphQL */ `
  type Article {
    id: ID!
    title: String!
    avatar: String
    description: String
    category: Category
  }

  type Category {
    id: ID!
    title: String!
    avatar: String
  }

  type Query {
    getListArticles: [Article]
    getArticles(id: ID!): Article
    getListCategories: [Category]
    getCategories(id: ID!): Category
  }

  input ArticleInput {
    title: String!
    avatar: String
    description: String
  }

  input CategoryInput {
    title: String!
    avatar: String
  }

  type Mutation {
    createArticle(input: ArticleInput!): Article
    updateArticle(id: ID!, input: ArticleInput!): String
    deleteArticle(id: ID!): String
    createCategory(input: CategoryInput!): Category
    updateCategory(id: ID!, input: CategoryInput!): String
    deleteCategory(id: ID!): String
  }
`;
