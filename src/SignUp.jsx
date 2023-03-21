import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // on change = update username/password
  // on click = verify input format and then set fetch req to backend
  const sendRequest = (username, password) => {
    fetch("http://localhost:3000/api/", {
      method: "POST",
      //mode: 'no-cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // successful login gives response array: [{userdoc}, [petListwithpetobj]]
        setUserInfo(data);
        setIsLoggedIn(true);
      })
      .then((data) => {
        console.log("user info : " + userInfo);
        navigate("/dash");
      })
      .catch((err) => console.log("this is catch error", err));
  };

  return (
    <div className="signupPage">
      <h1>Sign Up</h1>
      <div className="loginContainer">
        <form onSubmit={(event) => event.preventDefault()}>
          <label>Username: </label>
          <input
            id="username"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password: </label>
          <input
            id="password"
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => {
              sendRequest(username, password);
            }}
          >
            Submit
          </button>
        </form>
        <p>
          Already have an account ?{" "}
          <a key="link" href="/">
            Login Here!
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
