# GraphQL-examples

This Node.js express server is also a GraphQL server

Run it locally and go to http://localhost:4000/graphql

## schema
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

## queries

Basic query:
```sh
query {
	getUser(id: 1) {
        name
	age
	friends(first: 1)
    }
}
```

Updating data with "mutations":
```sh
mutation {
	setUserName(id: 1, name: "jim")
}
```

## introspection
Introspection lets you explore the server API from the outside

Gives you and overview, by listing all types:
```sh
{
  __schema {
    types {
      name
    }
  }
}
```

Clarifies on a specific type:
```sh
{
  __type(name: "User") {
    name
    kind
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}
```
