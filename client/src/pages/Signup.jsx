import React, { useState } from "react";
import { Link, json } from "react-router-dom";
import { useAuthContext } from "../context/Authcontext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const Signup = () => {
  //User inputs
  const [username, setUsername] = useState("");
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //loading
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const userSignup = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(`http://localhost:8080/api/register`, {
        name: username,
        acedamicYear: year,
        major,
        email,
        password,
      });
      Cookies.set("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="row d-flex justify-content-center align-items-center vh-100">
      {/* Toast Alert */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-12 col-md-6 col-lg-5">
        <form
          onSubmit={(e) => {
            userSignup(e);
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-center display-6 mb-3 fw-semibold">
                Sign up here
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="account-name">You Name</label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  id="account-name"
                  className="form-control"
                  placeholder="example name"
                />
              </div>
              <div className="col-12 col-lg-6 mb-3">
                <label>Acedamic Year</label>
                <select
                  className="form-select"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                >
                  <option value="empty">Choose your Option</option>
                  <option value="1">First Year</option>
                  <option value="2">Seoncd Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                  <option value="5">Fifth Year</option>
                </select>
              </div>
              <div className="col-12 col-lg-6 mb-3">
                <label>Acedamic Major</label>
                <select
                  className="form-select"
                  value={major}
                  onChange={(e) => {
                    setMajor(e.target.value);
                  }}
                >
                  <option value="empty">Choose your Option</option>
                  <option value="cs">Computer Science</option>
                  <option value="ct">Computer Technology</option>
                </select>
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="user-email">Email Address</label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  id="user-email"
                  className="form-control"
                  placeholder="example123@gmail.com"
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="user-email">Your Password</label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="text"
                  id="user-email"
                  className="form-control"
                  placeholder="examplePassword123!"
                />
              </div>
              <div className="col-12 mb-3">
                <button
                  className="btn btn-primary w-100"
                  disabled={isLoading && true}
                  type="submit"
                >
                  {isLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
              <div className="col-12">
                <Link to={"/login"}>
                  <div className="btn-link text-center">
                    Already has been account, login!
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
