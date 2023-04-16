import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const inputHandler = (event) => {
    setInputValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const navigate = useNavigate();
  const handler = (event) => {
    event.preventDefault();
    setError(Validation(inputValues));
    if (error.email === "" && error.password === "") {
      axios
        .post("http://localhost:8081/login", inputValues)
        .then((res) => {
          if (res.data === "SUCCESS") {
            navigate("/homepage");
          } else {
            alert("No record found ");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-In</h2>
        <form action="" onSubmit={handler}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              onChange={inputHandler}
              name="email"
              type="email"
              placeholder="Enter Email"
              className="form-control"
            />
            {error.email && <span className="text-danger">{error.email}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              onChange={inputHandler}
              name="password"
              type="password"
              placeholder="Enter Password"
              className="form-control"
            />
            {error.password && (
              <span className="text-danger">{error.password}</span>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Log in
          </button>
          <p> You are agree to our terms and policies </p>
          <Link to="/signup" className="btn btn-default border w-100">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
