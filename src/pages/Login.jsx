import React, { useState } from "react";

import useLogin from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  async function submitHandler(e) {
    e.preventDefault();

    await login(email, password);
  }

  return (
    <form className="login" onSubmit={submitHandler}>
      <h3>Login</h3>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
