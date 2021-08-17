import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "personal",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  id: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
