1. Create a server in api/graphql.ts using apollo-server-micro

    import {ApolloServer, gql} from "apollo-server-micro"
    const server = new ApolloServer({schema, context})

2. Create a handler in api/graphql.ts which handles the HTTP requests

    const handler = server.createHandler(path: "/api/graphql");

3. Using nextJS with apollo, an issue will appear which is fixed by creating a config in api/graphql.ts . We dont want nextJS to parse the body, we want it to be handled by the handler created in step 2.

    const config = {
      api: {
          bodyParser = false,
      },
    },

4. run npm prisma init, and put the models in /prisma/schema.prisma file. We do this so that when we create the schema in src/schema.ts, we can reference the model.

5. Create a schema in /src/schema.ts using @nexus/schema . View notes in the /src/schema.ts for guidance on how to create the schema.