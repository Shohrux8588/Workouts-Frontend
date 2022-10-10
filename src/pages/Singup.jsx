import React, { useState } from "react";

import useSignup from "../hooks/useSignup";

function Singup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  async function submitHandler(e) {
    e.preventDefault();
    await signup(email, password);
  }

  return (
    <form className="signup" onSubmit={submitHandler}>
      <h3>Signup</h3>
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
        Submit
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Singup;
