import express from "express";
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
  getContactsBySearch,
} from "../controllers/contact.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getContactsBySearch);
router.get("/", auth, getContacts);
router.post("/", auth, createContact);
router.patch("/:id", auth, updateContact);
router.delete("/:id", auth, deleteContact);

export default router;
