import React from "react"
import { Helmet } from "react-helmet"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Dad Jokes</title>
      </Helmet>
      <main className="flex 
        flex-col 
        justify-between 
        content-center
        text-center"
      >
        {children}
      </main>
      <footer className="text-center py-10">
        <div className="container mx-auto">
          <small className="text-base">
            Designed and made by {" "}
            <a className="text-red-800 underline" href="https://victoruniverse.com">
              Victor
            </a>
            <br />
            All jokes are gotten from{" "}
            <a className="text-red-800 underline" href="https://icanhazdadjoke.com">
              icanhazdadjoke.com
            </a>
            <br />
            3D Model from{" "}
            <a className="text-red-800 underline" href="https://skfb.ly/6BYHM">
              Sketchfab
            </a>
          </small>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default Layout
