import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Singup from "./pages/Singup";
import Login from "./pages/Login";

import useAuthContext from "./hooks/useAuthContext";

import "./styles/style.scss";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <Singup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
