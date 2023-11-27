import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/Authcontext";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [loginEamil, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //loading
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(`http://localhost:8080/api/login`, {
        email: loginEamil,
        password: loginPassword,
      });
      Cookies.set("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      setIsLoading(false);
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
            userLogin(e);
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-center display-6 mb-3 fw-semibold">
                Login here
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="login-user-email">Email Address</label>
                <input
                  value={loginEamil}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                  }}
                  type="email"
                  id="login-user-email"
                  className="form-control"
                  placeholder="example123@gmail.com"
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="login-user-password">Your Password</label>
                <input
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                  }}
                  type="text"
                  id="login-user-password"
                  className="form-control"
                  placeholder="examplePassword123!"
                />
              </div>
              <Link to="">
                <div className="btn-link text-left mb-3">
                  Forgotten your password?.
                </div>
              </Link>
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
                    "Login"
                  )}
                </button>
              </div>
              <div className="col-12">
                <Link to="/signup">
                  <div className="btn-link text-center">New here? signup.</div>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
