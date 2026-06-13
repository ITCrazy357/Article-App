import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import * as database from "./config/database";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolver";

import { requireAuth } from "./middlewares/auth.middleware";

const startServer = async () => {
  dotenv.config();
  database.connect();

  const app: Express = express();
  const port = process.env.PORT || 3000;

  app.use(cookieParser());

  //GraphQL

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await server.start();

  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
    requireAuth,
  );

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  });
};

startServer();
