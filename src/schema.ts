import { makeSchema, queryType, objectType, mutationType } from "@nexus/schema";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import path from "path";

const User = objectType({
  name: "User",
  definition(t) {
    // t.model.id() becuase it is already defined in prisma/schema.prisma which should be created first
    t.model.id();
    t.model.username();
  },
});

const Post = objectType({
  name: "Post",
  definition(t) {
    // t.model.id() becuase it is already defined in prisma/schema.prisma which should be created first
    t.model.id();
    t.model.title();
    t.model.post();
    t.model.user();
    t.model.userId();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.User({
      resolve: (parent, args, ctx) => {
        return ctx.prisma.user.findOne({ where: { id: args.where.id } });
      },
    });

    t.crud.users({
      resolve: (parent, args, context) => {
        return context.prisma.user.findMany();
      }
    });

    t.crud.post({
      resolve: (parent, args, ctx) => {
        return ctx.prisma.post.findOne({ where: { userId: args.where.userId } });
      },
    });

    t.crud.posts({
      resolve: (parent, args, context) => {
        return context.prisma.posts.findMany();
      }
    });
    // THE LONG WAY
    // t.field("queryName", {
    //   type: ReturnType,
    //   nullable: true,
    //   args: {
    //     id: idArg(),
    //   },
    //   resolve: (parent, { id }, ctx) => {
    //     return ctx.prisma.company.findOne({ where: { id: Number(id) } });
    //   },
    // });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOnePost();
  },
});

export const schema = makeSchema({
  types: { Query, User, Post, Mutation },
  // CRUD won't work without this option!!!
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), "schema.graphql"),
    typegen: path.join(process.cwd(), "nexus.ts"),
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});
