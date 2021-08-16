import React, { useState, useEffect } from "react";

import decode from "jwt-decode";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import "./Header.scss";
import { LOGOUT } from "../../constants/actionTypes";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logoutHandler();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [user?.token]);

  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
    history.push("/signin");
    setUser(null);
  };

  return (
    <header className="header">
      <div className="header__container">
        <FontAwesomeIcon
          icon={faAddressBook}
          size="2x"
          className="header__logo"
        />
        <h2>
          <span>Contact Keeper</span>
        </h2>
      </div>

      <ul className="header__items">
        {user?.result ? (
          <>
            <li className="header__item">
              <a href="!#" className="header__links">
                hello, {user?.result?.name}
              </a>
            </li>
            <li className="header__item" onClick={logoutHandler}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size="2x"
                className="header__logo"
              />
              <a href="/" className="header__links">
                logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li className="header__item">
              <a href="/signup" className="header__links">
                Register
              </a>
            </li>
            <li className="header__item">
              <a href="/signin" className="header__links">
                Login
              </a>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
