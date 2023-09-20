const fs = require('fs');
const {buildSchema} = require('graphql');
const path = require('path');

const comments = require('../data/comments');

const GQL_DIR = path.resolve(process.cwd(), './project/video/gql/comments.gql');

const schema = buildSchema(fs.readFileSync(GQL_DIR, 'utf-8'));

schema.getQueryType().getFields().comments.resolve = () => {
    return comments;
};

schema.getMutationType().getFields().praise.resolve = (arg0, {id}) => {
    const change_comment = comments.find(comment => comment['id'] === id);
    change_comment['praiseNum']++;
    return change_comment['praiseNum'];
};

module.exports = schema;

