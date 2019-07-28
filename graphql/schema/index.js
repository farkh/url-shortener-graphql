import { buildSchema } from 'graphql';

export default buildSchema(`

    type User {
        _id: ID!
        email: String!
        token: String!
    }

    type Url {
        _id: ID!
        longUrl: String!
        shortUrl: String!
        urlCode: String!
    }

    input UserInput {
        email: String!
        password: String!
        confirm: String!
    }
    
    type RootQuery {
        login(email: String!, password: String!): User
        verifyToken(token: String!): User
        getUrl(urlCode: String!): Url
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createUrl(longUrl: String!, expDate: String): Url
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`);
