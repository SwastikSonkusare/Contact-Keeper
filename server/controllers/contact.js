import Contact from "../models/contact.js";

export const createContact = async (req, res) => {
  const { firstName, lastName, email, phone, type } = req.body;

  const newContact = new Contact({
    ...contact,
    user: req.userId,
    name: `${firstName} ${lastName}`,
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
