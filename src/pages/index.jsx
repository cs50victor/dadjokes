import React from "react";
import Layout from "../components/Layout";
import {Link } from "gatsby";
import "../styles/index.scss";

const client = new ApolloClient({
  uri: "https://icanhazdadjoke.com/graphql"
})

export default function Home() {
  return (
    <Layout>
      <Link to="./testing">WTF</Link>
    </Layout>
  )
}
