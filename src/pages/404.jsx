import React from "react";
import Layout from "../components/Layout";
import {Link}from "gatsby";




export default function Error () {
    return(
        <Layout>
            <div>
                <h1>404 PAGE NOT FOUND</h1>
                <br/>
                <img src="https://media.giphy.com/media/eiSGqOQ57b4Keyrjbp/source.gif" 
                alt="" width="200px" className="img-fluid"/>
                <br/>
                <br/>
                <Link to="/" className="btn btn-dark btn-lg">Home</Link>
            </div>
        </Layout> 
    )
}