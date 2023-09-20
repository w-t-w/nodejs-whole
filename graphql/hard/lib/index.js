const fs = require('fs');
const {buildSchema} = require('graphql');
const path = require('path');

const comments = require('../data/comments');

const GQL_DIR = path.resolve(process.cwd(), './graphql/hard/gql/comments.gql');

const schema = buildSchema(fs.readFileSync(GQL_DIR, 'utf-8'));

schema.getQueryType().getFields().comments.resolve = () => {
    return comments;
};

module.exports = schema;