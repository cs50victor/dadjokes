import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const jokes = gql`{
  joke {
    joke
  }
}`

const Card = () => {
  return (
    <Query query={jokes}>
      {({ loading, error, data }) => {
        if (loading) return <p>Dad Joke Loading...</p>
        if (error) return <p>Looks like we've got a problem...</p>
        return (
          <div className="container d-flex align-content-center justify-content-center">
            <div className="column">
                <h1>Articles</h1>
                {console.log(data.joke.joke)}
              {data.joke.map(jokes => (
                <div className="col-sm">
                  <div className="card my-5" style={{width: "18rem"}}>
                    <div className="card-body">
                      <p className="card-text">{jokes.joke}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    </Query>
  );
}

export default Card;