import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState({})

useEffect(() => {
  attemptLoginWithToken()
}, [])

  const logIn = async (event) => {
    event.preventDefault();
    try {
      //axios request

      // const response = await axios.post("/login", {
      //   username,
      //   password,
      // });
      // console.log(response)
      // localStorage.setItem('token', response.data.token)
   

      //de-axios'd post request

      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      const responseJson = await response.json();
      console.log(responseJson);
      localStorage.setItem("token", responseJson.token);

      // console.log(response)

      // localStorage.setItem('token', response.token.data)

      // const responseJson = await response.json();
      // console.log(responseJson);
      // setAuth(await response.json())

    } catch (error) {
      console.log(error);
    }
  };

   const attemptLoginWithToken = async() => {
    const token = localStorage.getItem("token");
    if(token) {
      const response = await axios.get('/login', {
        headers: {
          authorization: token
        }
      });
      console.log(response)
    }
   }


  return (
    <>
      <h2>Acme Auth</h2>

      {auth.username ? (
        <>
          <h1>Welcome {auth.username}!</h1>
          <button>Logout</button>
        </>
      ) : (
        <form onSubmit={logIn}>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Log in</button>
        </form>
      )}
    </>
  );
};

export default App;
