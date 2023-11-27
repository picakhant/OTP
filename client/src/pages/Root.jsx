import React from "react";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="btn btn-primary">Login</div>
        <Link to={"/signup"}>
          <div className="btn btn-primary">Sign up</div>
        </Link>
      </div>
    </div>
  );
};

export default Root;
