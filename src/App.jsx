import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState({})

  const logIn = async (event) => {
    event.preventDefault();
    try {
      //axios request

      // const response = await axios.post("/login", {
      //   username,
      //   password,
      // });
      // // const auth = response.data;
      // setAuth(response.data);

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
      console.log(response)
      // const responseJson = await response.json();
      // console.log(responseJson);
      // setAuth(await response.json())

    } catch (error) {
      console.log(error);
    }
  };

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
