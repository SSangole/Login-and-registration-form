import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";

function Signup() {
  const [inputValues, setInputValues] = useState({
    name: "",
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
    if (error.name === "" && error.email === "" && error.password === "") {
      axios
        .post("http://localhost:8081/signup", inputValues)
        .then((res) => navigate("/"))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-Up</h2>
        <form action="" onSubmit={handler}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              onChange={inputHandler}
              name="name"
              type="name"
              placeholder="Enter Name"
              className="form-control"
            />
            {error.name && <span className="text-danger">{error.name}</span>}
          </div>

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

          <button className="btn btn-success w-100">Signup</button>
          <p> You are agree to our terms and policies </p>
          <Link to="/" className="btn btn-default border w-100">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
