const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

import graphQLSchema from './graphql/schema';
import graphQLResolvers from './graphql/resolvers';

const app = express();

app.use(
    cors(),
    bodyParser.json(),
);
app.use(
    "/api",
    expressGraphQL((req, res, graphQLParams) => ({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true,
        pretty: true,
        context: {
            req,
            res,
        },
    })),
);
app.use('/', require('./routes/redirect'));

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const main = () => {
    const PORT = process.env.PORT || 5000;
    const { mongoURI } = require('./config/db');

    mongoose
        .connect(mongoURI, { useNewUrlParser: true })
        .then(() => {
            app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
        })
        .catch(err => console.error(err));
};

main();
