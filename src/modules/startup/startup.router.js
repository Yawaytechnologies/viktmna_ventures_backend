import express from "express";
import { createStartupController, getAllStartupsController, getStartupByIdController, deleteStartupController } from "./startup.controller.js";

const router = express.Router();

router.post("/", createStartupController);
router.get("/", getAllStartupsController);
router.get("/:id", getStartupByIdController);
router.delete("/:id", deleteStartupController);

export default router;
