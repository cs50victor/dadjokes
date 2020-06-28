import React from "react";
import Layout from "../components/Layout";
import {Link}from "gatsby";

import "../styles/index.scss";


export default function (){
    return(
        <Layout>
            <h1>404 PAGE NOT FOUND :(</h1>
            <Link to="./" className="btn btn-danger">Home</Link>
        </Layout>
    )
}