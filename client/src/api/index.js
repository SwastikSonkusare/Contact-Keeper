import axios from "axios";

const API = axios.create({
  baseURL: "https://contact-keeper-jsx.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signUp", formData);

export const getAllContacts = () => API.get("/contact");
export const getContactsByQuery = (search) =>
  API.get(`/contact/search?searchQuery=${search || "none"}`);
export const createContact = (formData) => API.post("/contact", formData);
export const updateContact = (id, formData) =>
  API.patch(`/contact/${id}`, formData);
export const deleteContact = (id) => API.delete(`/contact/${id}`);
