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
  getDoctorsByDepartment,
} from "../controllers/doctorController.js";

router.route("/create").post(protect, checkRoleAsDoctor, createDoctor);
router.route("/").get(getDoctors);
router.route("/department/:department_id").get(getDoctorsByDepartment);
router
  .route("/:id")
  .delete(protect, admin, deleteDoctor)
  .get(protect, getDoctorById)
  .put(protect, updateDoctor);
export default router;
