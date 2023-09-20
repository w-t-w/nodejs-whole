const {graphql, buildSchema} = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = {
    hello() {
        return 'hello nodeJS!!!';
    }
};

graphql({schema, source: `{ hello }`, rootValue})
    .then(result => {
        console.log(result.data);
        console.log(result.data.hello);
    })
    .catch(err => {
        console.error(err);
    });