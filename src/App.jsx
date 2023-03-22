import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Dash from "./Dash";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Log user in and fetch data if JWT is present
  useEffect(() => {
    const checkAuth = async () => {
      console.log("local storage " + localStorage.getItem("LoginToken"));
      try {
        const response = await fetch("http://localhost:3000/api/checkToken", {
          method: "POST",
          credentials: "include",
          headers: {
            authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("jwt fetch ok", data);
          setUserInfo(data);
          setIsLoggedIn(true);
        } else {
          console.error("JWT app.jsx Unable to authenticate jwt");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("JWT app.jsx", error);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);
  // if loggedIn is truthy, go to Dash; if not, redirect to Login
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? (
              <Dash
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Login
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Dash
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <SignUp
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        ></Route>
        <Route
          path="/dash"
          element={
            isLoggedIn ? (
              <Dash
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Login
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

// workshop for button opening multiple tabs:// onClick method
