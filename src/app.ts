import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import {fileLoader, mergeTypes, mergeResolvers} from "merge-graphql-schemas";
import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import {gql} from "apollo-server-core";
import dotenv from 'dotenv';

// Get global environment
dotenv.config();

// The GraphQL schema in string form
const types = mergeTypes(fileLoader(`${__dirname}/resources/**/*.graphql`), {all: true, schemaDefinition: false});
const typeDefs = gql`${types}`;

// The resolvers
const resolvers = mergeResolvers(fileLoader(`${__dirname}/resources/**/*.ts`));
const directiveResolvers = mergeResolvers(fileLoader(path.join(__dirname, '/directives/*.ts')));

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

//MongoDB
mongoose.connect('mongodb://localhost:27017/resume', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB Connected"))

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

// Middleware


// Start the server
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});
