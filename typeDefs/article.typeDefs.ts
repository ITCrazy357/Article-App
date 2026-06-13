export const typeDefsArticle = /* GraphQL */ `
  type Article {
    id: ID!
    title: String!
    avatar: String
    description: String
    category: Category
  }

  type Query {
    getListArticles(
      sortKey: String
      sortValue: String
      currentPage: Int = 1
      limitItem: Int = 3
      filterKey: String
      filterValue: String
      keyword: String
    ): [Article]
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
