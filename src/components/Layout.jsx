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
            <Container fluid="sm">
              <small>
                All jokes are gotten from {" "}
                <a href="https://icanhazdadjoke.com">
                    icanhazdadjoke.com
                </a>
                <br/>
                "Table" by yryabchenko is licensed 
                under Creative Commons Attribution. 
                https://skfb.ly/6BYHM To view a copy of this license, 
                visit http://creativecommons.org/licenses/by/4.0/.
              </small>
            </Container>
        </footer>
    </React.Fragment> 
  )
}

export default Layout;