import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async(event) => {
    event.preventDefault();
    try {
      //de-axios'd post request

      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      
      const responseJson = await response.json();
  
//axios request

    // const response = await axios.post('/login', {
    //   username,
    //   password
    // })

      // const responseJson = await response.json()

      console.log(responseJson)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <h1>Acme Auth</h1>

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
    </>
  );
};

export default App;