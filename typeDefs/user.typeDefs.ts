export const typeDefsUser = /* GraphQL */ `
  type User {
    id: ID!
    fullName: String!
    email: String!
  }

  type UserResponse {
    code: Int!
    message: String!
    user: User
  }

  type AuthResponse {
    code: Int!
    message: String!
    token: String
    user: User
  }

  input RegisterInput {
    fullName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUser: UserResponse!
  }

  type Mutation {
    registerUser(user: RegisterInput!): AuthResponse!
    loginUser(user: LoginInput!): AuthResponse!
  }
`;
