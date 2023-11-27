import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { Route, Routes } from "react-router-dom";
import Root from "./pages/Root.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
const App = () => {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
