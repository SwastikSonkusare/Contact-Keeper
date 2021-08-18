import Contact from "../models/contact.js";

import mongoose from "mongoose";

export const createContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  const newContact = new Contact({
    user: req.userId,
    name,
    email,
    phone,
    type,
    createdAt: new Date().toISOString(),
  });

  try {
    await newContact.save();
    res.status(200).json(newContact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.userId }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
export const updateContact = async (req, res) => {
  const { id: _id } = req.params;
  const contact = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(_id, contact, {
      new: true,
    });
    res.json(updatedContact);
    await updatedContact.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    await contact.remove();
    res.json({ message: "Contact removed Successfully" });
  } else {
    res.status(404);
    throw new Error("Contact not found");
  }
};
