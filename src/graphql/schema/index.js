import { buildSchema } from "graphql";
module.exports = buildSchema(`
    type Ping{
        pong: String!
    }
    input inputPDF{
        name: String
        path: String
    }
    type User{
        _id: ID!
        username: String!
        email: String!
        password: String!
        error: [Error]
    }
    type AuthData{
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }
    input UserInput{
        username: String
        email: String
        password: String!
    }
    type Error {
        path: String!
        message: String!
    }
    type RootQuery {
        signIn(userInput: UserInput): AuthData!
        pingWithoutAuth: Ping!
        pingWithAuth: Ping!
        upFile(inputpdf: inputPDF): Ping
    }
    type RootMutation{
        newUser(userInput: UserInput!): User
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);
