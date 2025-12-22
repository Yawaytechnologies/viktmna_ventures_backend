import { createInvestorController, getAllInvestorsController, getInvestorByIdController, deleteInvestorController } from "./invester.controller.js";
import express from "express";
import upload from "../../middlewares/multer.js";

const router = express.Router();


router.post("/", upload, createInvestorController);
router.get("/", getAllInvestorsController);
router.get("/:id", getInvestorByIdController);
router.delete("/:id", deleteInvestorController);

export default router;