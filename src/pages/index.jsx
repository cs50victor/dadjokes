import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import typical from "../assets/bald-man.svg";
import "../styles/index.scss";

export const GATSBY_QUERY = graphql`
  {
    dad {
      joke {
        joke
      }
    }
  }
`;

export default function Home ({data:{dad:{joke}}}){
  const [timeLeft, setTimeLeft] = useState(15);
  const [newJoke, setNewJoke] = useState();

  
  //!------------------------------------------------------
   //? clearInterval and setInterval helped solve the time glitch problem
   const firstJoke = `${joke.joke}`;
   useEffect(()=>{
    
    setNewJoke(`${joke.joke}`);
    if (timeLeft < 0){
      setTimeLeft(15);
    }
    const id = setInterval(() => setTimeLeft(timeLeft - 1), 1000);

    if ( newJoke !== firstJoke){
      clearInterval(id);
      setTimeLeft(15);
      return
    }

    return () => {
      clearInterval(id);
    };

  }, [timeLeft, newJoke]);

  /*if (timeLeft === 0 || newJoke !== firstJoke){
    setTimeLeft(15);
  }
  else{
    setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  }*/
  //!------------------------------------------------------
  return(
  <Layout>
    <Helmet>
            <title>Dad Jokes</title>
    </Helmet>
    <div className="card text-center">
      <div className="card-header m-2">
        Dad Jokes (15s)
      </div>
      <div className="card-body">
        <img src={typical}  className="img-fluid" alt="" width="150px"/>
        <h5 className="card-title p-4" >{newJoke}</h5>
        <span className="bg-dark text-white px-2 py-1 rounded-circle">{timeLeft}</span>
      </div>
    </div>
  </Layout>
  )
};
