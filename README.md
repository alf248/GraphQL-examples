# GraphQL-examples
A few examples with GraphQL

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

query {
	getUser(id: 1) {
        name
    }
}

mutation {
	setUserName(id: 1, name: "jim")
}

## introspection
Introspection lets you explore the server API from the outside

Gives you an overview:
{
  __schema {
    queryType {
      name
    }
  }
}

Clarifies on a specific type:
{
  __type(name: "Query") {
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
*/