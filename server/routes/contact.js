import express from "express";
import { createContact, getContacts } from "../controllers/contact.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getContacts);
router.post("/", auth, createContact);

export default router;
