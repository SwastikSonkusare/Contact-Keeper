import express from "express";
import { createContact } from "../controllers/contact.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createContact);

export default router;
