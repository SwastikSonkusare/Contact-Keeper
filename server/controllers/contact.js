import Contact from "../models/contact.js";

export const createContact = async (req, res) => {
  const contact = req.body;

  const newContact = new Contact({
    ...contact,
    user: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newContact.save();
    res.status(200).json(newContact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
