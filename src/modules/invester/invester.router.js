import { createInvestorController, getAllInvestorsController, getInvestorByIdController, deleteInvestorController } from "./invester.controller.js";
import express from "express";
import multer from "multer";

const router = express.Router();

// Configure multer for file uploads (in memory)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("logo"), createInvestorController);
router.get("/", getAllInvestorsController);
router.get("/:id", getInvestorByIdController);
router.delete("/:id", deleteInvestorController);

export default router;