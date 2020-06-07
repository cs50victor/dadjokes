import React from "react";
import Layout from "../components/Layout";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Card from "../components/Card"
import "../styles/index.scss";

const client = new ApolloClient({
  uri: "https://icanhazdadjoke.com/graphql"
})

export default function Testing() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Card/>
      </Layout> 
    </ApolloProvider>
  )
}
