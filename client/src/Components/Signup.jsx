import React, { useState } from "react";
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Success: ", result);
      // Redirect to login or do something else
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="container">
      <header className="row text-center">
        <div className="col">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Goodreads_logo.svg/2560px-Goodreads_logo.svg.png"
            alt="Terello"
            className="img-fluid"
          />
        </div>
      </header>
      <main className="row justify-content-center">
        <div className="col-lg-6 d-flex justify-content-center">
          <img
            src="https://img.freepik.com/premium-vector/young-woman-enjoy-sitting-reading-book-hygge-concept-vector-illustration_194708-2078.jpg"
            alt="girl-reading-a-book"
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6 mt-5 pt-5">
          <form className="sign-up">
            <h4 className="mb-5">Find your next favorite book!</h4>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={handleChange}
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                className="form-control"
                id="password"
                placeholder="Create a password"
              />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary w-100">
              Create account
            </button>
          </form>
          <p className="hr-lines my-4">OR</p>
          <div className="d-grid gap-2">
            <button className="btn btn-outline-dark">
              <i className="fab fa-google"></i> Sign up with Google
            </button>
          </div>
          <div className="sign-in text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
