import { useState } from "react";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async(event) => {
    event.preventDefault();
    try {
      const response = await fetch('/login')
      const responseJson = await response.json()
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