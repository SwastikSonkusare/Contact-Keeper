import React from "react";

const SignIn = () => {
  return (
    <div className="auth">
      <h1 className="auth__header">Account Register</h1>
      <form className="form">
        <div className="form__control">
          <label className="form__label">Email</label>
          <input className="form__input" type="email"></input>
        </div>
        <div className="form__control">
          <label className="form__label">Password</label>
          <input className="form__input" type="password"></input>
        </div>

        <button className="form__button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignIn;
