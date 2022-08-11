import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function FreeComponent() {
  const [message, setMessage] = useState("");

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://ironfistdb.herokuapp.com/free-endpoint",
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, [])

  return (
    <div>
      <h1 className="text-center">IronFist Information</h1>

      <h3 className="text-center text-danger">Welcome to our website</h3>
      <img src="https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/2c4000bd30abd1d5cc2cf179f11e90cb/large.jpg" alt="Iron Fist" className="img-fluid" />
    </div>
  );
}

