var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

    type User {
        name: String
        age: Int
        friends(first: Int): [String]
    }

    type Query {
        getUser(id: Int!): User
        getOffers(first: Int): [String]
        getOrders(first: Int): [String]
    }

    type Mutation {
        setUserName(id: Int!, name: String!): String
    }
`);


var users = {
    1: {name: "joe", age: 22, friends: ["mia", "lea"]},
    2: {name: "mia", age: 33, friends: ["joe"]},
    3: {name: "lea", age: 44, friends: ["kim, joe"]},
    4: {name: "kim", age: 44, friends: ["lea"]},
}


// The root provides a resolver function for each API endpoint
var root = {

    getUser: ({id}) => {
        return new User(id)
    },

    setUserName: ({id, name}) => {
        return users[id].name = name
    },

    orders: () => {
        return [1, 2, 3, 4, 5, 6]
    },

    offers: () => {
        return ["a", "b", "c"]
    },

};


class User {
    constructor(id) {
      this.id = id;
    }
  
    name() {
      return users[this.id].name
    }
  
    age() {
        return users[this.id].age
    }

    friends({first}) {
        return users[this.id].friends.slice(first)
    }
}


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');