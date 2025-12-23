import express from "express";
import { createStartupController, getAllStartupsController, getStartupByIdController, deleteStartupController } from "./startup.controller.js";
import upload from "../../middlewares/multer.js";
const router = express.Router();



router.post("/", upload, createStartupController);
router.get("/", getAllStartupsController);
router.get("/:id", getStartupByIdController);
router.delete("/:id", deleteStartupController);

export default router;
