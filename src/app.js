import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import graphQLSchema from './graphql/schema/index'
import graphQLResolver from './graphql/resolvers/index'
import isAuth from './middlewares/isAuth'
import { graphqlHTTP } from 'express-graphql';
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
      return res.sendStatus(200);
    };
    next();
  })

app.use(isAuth)

app.use(
    '/graphql',
    graphqlHTTP({
      schema: graphQLSchema,
      rootValue: graphQLResolver,
      graphiql: true
    })
  );
  
mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    app.listen(4000, () => {
      console.log(`Serven running on port 4000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });