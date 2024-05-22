import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <p>
      Some error occured,go to
      <Link to="/" className="text-blue-500">
        {" "}
        Homepage
      </Link>
    </p>
  );
};

export default Error;
