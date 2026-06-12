export const typeDefsCategory = /* GraphQL */ `
  type Category {
    id: ID!
    title: String!
    avatar: String
  }

  type Query {
    getListCategories: [Category]
    getCategories(id: ID!): Category
  }

  input CategoryInput {
    title: String!
    avatar: String
  }

  type Mutation {
    createCategory(input: CategoryInput!): Category
    updateCategory(id: ID!, input: CategoryInput!): String
    deleteCategory(id: ID!): String
  }
`;
