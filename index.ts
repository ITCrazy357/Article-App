import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolvers";

dotenv.config();
database.connect();

const app: Express = express();
const port = process.env.PORT || 3000;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await server.start();

  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  });
};

startServer();
