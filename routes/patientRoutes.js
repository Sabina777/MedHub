import express from "express";
import {
  protect,
  checkRoleAsPatient,
  admin,
} from "../middleware/authmiddleware.js";
const router = express.Router();
import {
  createPatient,
  updatePatient,
  getPatients,
  getPatientById,
  deletePatient,
} from "../controllers/patientController.js";

router.route("/create").post(protect, checkRoleAsPatient, createPatient);

router
  .route("/:id")
  .delete(protect, admin, deletePatient)
  .get(protect, getPatientById)
  .put(protect, checkRoleAsPatient, updatePatient);
export default router;
