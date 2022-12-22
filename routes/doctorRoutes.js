import express from "express";
import {
  protect,
  checkRoleAsDoctor,
  admin,
} from "../middleware/authmiddleware.js";
const router = express.Router();
import {
  createDoctor,
  updateDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
} from "../controllers/doctorController.js";

router.route("/create").post(protect, checkRoleAsDoctor, createDoctor);

router
  .route("/:id")
  .delete(protect, admin, deleteDoctor)
  .get(protect, getDoctorById)
  .put(protect, checkRoleAsDoctor, updateDoctor);
export default router;
