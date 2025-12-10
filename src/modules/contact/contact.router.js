import { createContactController, getAllContactsController, getContactByIdController, deleteContactController } from "./contact.controller.js";

import express from "express";

const router = express.Router();
router.post("/", createContactController);
router.get("/", getAllContactsController);
router.get("/:id", getContactByIdController);
router.delete("/:id", deleteContactController);

export default router;