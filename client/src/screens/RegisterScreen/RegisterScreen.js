import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { signUp } from "../../actions/auth";
import { validateEmail } from "../../utils/validate";

const RegisterScreen = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { addToast } = useToasts();

  const { isLoggedIn, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      addToast("You have entered an invalid email address!", {
        appearance: "error",
        autoDismiss: "true",
      });
    } else if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: "true",
      });
    } else {
      dispatch(signUp(formData));
    }
  };

  if (isLoggedIn) {
    history.push("/signin");
  }

  return (
    <div className="auth">
      <h1 className="auth__header">Account Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__control">
          <label className="form__label">First Name</label>
          <input
            name="firstName"
            className="form__input"
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          ></input>
        </div>

        <div className="form__control">
          <label className="form__label">Last Name</label>
          <input
            name="lastName"
            className="form__input"
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          ></input>
        </div>
        <div className="form__control">
          <label className="form__label">Email</label>
          <input
            name="email"
            className="form__input"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          ></input>
        </div>
        <div className="form__control">
          <label className="form__label">Password</label>
          <input
            name="password"
            className="form__input"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          ></input>
        </div>
        <div className="form__control">
          <label className="form__label">Confirm Password</label>
          <input
            name="confirmPassword"
            className="form__input"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          ></input>
        </div>

        <button className="form__button" type="submit">
          Register
        </button>

        <button className="form__account">
          <a href="/signin">Already have an account? Click here!</a>
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
