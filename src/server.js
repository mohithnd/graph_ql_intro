import { ApolloServer, gql } from "apollo-server";

const TODOS = [
  {
    id: "1",
    task: "Todo 1",
    completed: true,
  },
  {
    id: "2",
    task: "Todo 2",
    completed: true,
  },
  {
    id: "3",
    task: "Todo 3",
    completed: false,
  },
];

const USERS = [
  { id: 1, email: "a@b.com", todos: [TODOS[1], TODOS[2]] },
  { id: 2, email: "c@d.com", todos: [] },
];

const typeDefs = gql`
  type Todo {
    id: ID!
    task: String!
    completed: Boolean!
  }

  type User {
    id: ID!
    email: String
    todos: [Todo]!
  }

  type Query {
    getAllTodos: [Todo]
    getTodo(id: ID!): Todo!
    getAllUsers: [User]!
  }
`;

const resolvers = {
  Query: {
    getAllTodos: () => {
      return TODOS;
    },

    getTodo: (_, params) => {
      console.log(params);
      return TODOS.find((todo) => todo.id == params.id);
    },

    getAllUsers: () => {
      return USERS;
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.listen().then(() => {
  console.log("GraphQL Server Is Up");
});
