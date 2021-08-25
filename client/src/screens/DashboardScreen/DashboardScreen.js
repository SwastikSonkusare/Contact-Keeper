import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import NumberFormat from "react-number-format";

import {
  createContact,
  deleteContact,
  getContacts,
  getContactsBySearch,
  updateContact,
} from "../../actions/contact";
import { validateEmail } from "../../utils/validate";

import "./DashboardScreen.scss";

const DashboardScreen = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const { addToast } = useToasts();

  const user = JSON.parse(localStorage.getItem("profile"));

  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const dispatch = useDispatch();

  const { contacts, isContactCreated, isContactDeleted, isContactUpdated } =
    useSelector((state) => state.contacts);

  const contact = currentId ? contacts.find((c) => c._id === currentId) : null;

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  useEffect(() => {
    dispatch(getContacts());
  }, [isContactUpdated, isContactDeleted, isContactCreated, dispatch]);

  useEffect(() => {
    if (isContactCreated) {
      addToast("Contact Created!", {
        appearance: "success",
        autoDismiss: "true",
      });
    }
    if (isContactUpdated) {
      addToast("Contact Updated!", {
        appearance: "success",
        autoDismiss: "true",
      });
    }
    if (isContactDeleted) {
      addToast("Contact Deleted!", {
        appearance: "success",
        autoDismiss: "true",
      });
    }
  }, [isContactUpdated, isContactDeleted, isContactCreated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      addToast("You have entered an invalid email address!", {
        appearance: "error",
        autoDismiss: "true",
      });
    } else if (currentId) {
      dispatch(
        updateContact(currentId, { ...formData, user: user?.result?._id })
      );
    } else {
      dispatch(createContact(formData));
    }
    clear();
  };

  const searchContacts = () => {
    if (search) {
      dispatch(getContactsBySearch(search));
      history.push(`/dashboard/search?searchQuery=${search || "none"}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      searchContacts();
    }
  };

  const handleDeleteContact = (id) => {
    console.log(id);
    dispatch(deleteContact(id));
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
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

            <NumberFormat
              name="phone"
              className="form__input"
              value={formData.phone}
              displayType={"input"}
              format="### ### ####"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
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
        <div className="dashboard__filter">
          <input
            type="text"
            placeholder="Search for your contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          ></input>
        </div>

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
                      onClick={() => handleDeleteContact(c._id)}
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
