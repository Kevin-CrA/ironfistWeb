import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const token = cookies.get("TOKEN");
const ProtectedRoutes = () => {
  let auth = {'token':false}
  if (token) {
    auth = {'token':true}
  }
  return (
      auth.token ? <Outlet /> : <Navigate to="/" /> 
    );
  }
  export default ProtectedRoutes;










/*import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// receives component and any other props represented by ...rest
export default function ProtectedRoutes({ component: Component, ...rest }) {
  return (

    // this route takes other routes assigned to it from the App.js and return the same route if condition is met
    <Outlet
      {...rest}
      render={(props) => {
        // get cookie from browser if logged in
        const token = cookies.get("TOKEN");

        // returns route if there is a valid token set in the cookie
        if (token) {
          return <Component {...props} />;
        } else {
          // returns the user to the landing page if there is no valid token set
          return (
            <Navigate
              to={{
                pathname: "/",
                state: {
                  // sets the location a user was about to access before being redirected to login
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
*/