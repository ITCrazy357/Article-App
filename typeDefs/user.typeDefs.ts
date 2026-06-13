export const typeDefsUser = /* GraphQL */ `
  type User {
    id: ID!
    fullName: String!
    email: String!
  }
  #   Register
  input RegisterInput {
    fullName: String!
    email: String!
    password: String!
  }

  type RegisterResponse {
    code: Int!
    message: String!
    token: String
    user: User
  }

  #   Login
  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    code: Int!
    message: String!
    token: String
    user: User
  }

  type Mutation {
    registerUser(user: RegisterInput!): RegisterResponse!
    loginUser(user: LoginInput!): LoginResponse!
  }
`;
