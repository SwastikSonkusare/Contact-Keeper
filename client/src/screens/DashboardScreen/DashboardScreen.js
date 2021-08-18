import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../../actions/contact";

import "./DashboardScreen.scss";

const DashboardScreen = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    type: "personal",
  };

  const user = JSON.parse(localStorage.getItem("profile"));

  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const contactDetails = useSelector((state) => state.contacts);

  const {
    contacts,
    success,
    isContactCreated,
    isContactUpdated,
    isContactDeleted,
  } = contactDetails;

  const contact = currentId ? contacts.find((c) => c._id === currentId) : null;

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  useEffect(() => {
    dispatch(getContacts());
  }, [success, dispatch, isContactCreated, isContactUpdated, isContactDeleted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updateContact(currentId, { ...formData, user: user?.result?.name })
      );
    }

    dispatch(createContact(formData));
    setFormData(initialState);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__left-section">
        <h2>
          <span>{currentId ? "Update a contact" : "Add a contact"}</span>
        </h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__control">
            <label className="form__label"> Name</label>
            <input
              name="name"
              className="form__input"
              type="text"
              value={formData.name}
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
                type="radio"
                name="type"
                value="personal"
                checked={formData.type === "personal"}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />{" "}
              Personal{" "}
              <input
                type="radio"
                name="type"
                value="professional"
                checked={formData.type === "professional"}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />{" "}
              Professional
            </div>
          </div>
          <button type="submit" className="form__button form__button--1">
            {currentId ? "Update a contact" : "Add a contact"}
          </button>
        </form>
      </div>
      <div className="dashboard__right-section">
        {contacts.length ? (
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

                  <div className="contact__container">
                    <button
                      className="contact__btn contact__btn--1"
                      onClick={() => setCurrentId(c._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="contact__btn contact__btn--2"
                      onClick={() => dispatch(deleteContact(c._id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="contact__right">{c.type}</div>
              </div>
            </>
          ))
        ) : (
          <div className="dashboard__left-section">
            <h2>
              <span>No Contacts yet</span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;
