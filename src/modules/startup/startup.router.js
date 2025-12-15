import express from "express";
import multer from "multer";
import { createStartupController, getAllStartupsController, getStartupByIdController, deleteStartupController } from "./startup.controller.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("logo"), createStartupController);
router.get("/", getAllStartupsController);
router.get("/:id", getStartupByIdController);
router.delete("/:id", deleteStartupController);

export default router;
