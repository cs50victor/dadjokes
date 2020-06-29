const express = require("express");
const graphqlHTTP = require("express-graphql");
const {buildSchema} = require("graphql");
const app = express();

const port = process.env.PORT || 8080;

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
    hello: () => {
      return 'Hello world!';
    },
};
app.use(express.static(__dirname + "/public"));

app.use('/__graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

//routes

app.get("/", (req,res)=>{
    res.render("index");
})

app.listen(port)


