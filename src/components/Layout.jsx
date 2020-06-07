import React from "react";
import {Link} from "gatsby";
import {Container, Navbar} from "react-bootstrap";

const Layout =({children})=> {
  return (
    <React.Fragment>
        <header>
            <Container>
                <Navbar className="bg-secondary">
                    <Link to="./">DAD JOKES</Link>
                </Navbar>
            </Container>
        </header>
        <main>
            <Container className="text-center d-flex flex-column">
                 {children}
            </Container>
        </main>
        <footer></footer>
    </React.Fragment> 
  )
}

export default Layout;