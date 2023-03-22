import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const navigate = useNavigate();

  const sendRequest = (username, password) => {
    setWrong(false);
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      //mode: 'no-cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        if (res.status === 400) setWrong(true);
        console.log("res.body: ", JSON.stringify(res.body));
        return res.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data));
        setUserInfo(data["userInfo"]);
        setIsLoggedIn(true);
        localStorage.setItem("LoginToken", data.accessToken);
        return data;
      })
      .then((data) => {
        navigate("/dash");
      })
      .catch((err) => console.log("this is catch error", err));
  };

  return (
    <div className="loginPage">
      <h1>Login</h1>
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
        {wrong && <h4 className="wrong">Incorrect Username or Password</h4>}
        <p>
          No Account Yet?{" "}
          <a key="link" href="/#/signup">
            Sign Up Here!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
