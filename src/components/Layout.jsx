import React from "react";
import {Container} from "react-bootstrap";

const Layout =({children})=> {
  return (
    <React.Fragment>
        <main>
            <Container className="text-center">
                 {children}
            </Container>
        </main>
        <footer>
            <Container>
            </Container>
        </footer>
    </React.Fragment> 
  )
}

export default Layout;