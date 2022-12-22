import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
const router = express.Router();
import {
  createPatient,
  updatePatient,
  getPatients,
  getPatientById,
  deletePatient,
} from "../controllers/patientController";

router.route("/create").post(protect, createPatient);

router
  .route("/:id")
  .delete(protect, deletePatient)
  .get(protect, getPatientById)
  .put(protect, updatePatient);
export default router;
