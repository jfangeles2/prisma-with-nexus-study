import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/schema";
import { createContext } from "src/context";

const server = new ApolloServer({
  schema,
  context: createContext
});
const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
