import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getContacts } from "../../actions/contact";

import "./DashboardScreen.scss";

const DashboardScreen = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "personal",
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const contactDetails = useSelector((state) => state.contacts);

  const { contacts, success } = contactDetails;

  useEffect(() => {
    dispatch(getContacts());
  }, [success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch()
  };

  return (
    <div className="dashboard">
      <div className="dashboard__left-section">
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
            <label className="form__label">Phone</label>
            <input
              name="phone"
              className="form__input"
              type="number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            ></input>
          </div>
          <div className="form__control">
            <h4>Contact Type</h4>
            <div className="form__checkbox">
              <input
                type="checkbox"
                id="type"
                name="type"
                value={formData.type}
              />
              <label className="form__label">Personal</label>
              <input
                type="checkbox"
                id="type"
                name="type"
                value={formData.type}
              />
              <label className="form__label">Professional</label>
            </div>
          </div>
        </form>
      </div>
      <div className="dashboard__right-section">
        {contacts.length &&
          contacts.map((c) => (
            <>
              <div className="contact">
                <div className="contact__left">
                  <h5>
                    <span>{c.name}</span>
                  </h5>
                  <div className="contact__container">
                    <small>{c.email}</small>
                  </div>
                  <div className="contact__container">
                    <small>{c.phone}</small>
                  </div>
                </div>
                <div className="contact__right">{c.type}</div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default DashboardScreen;
