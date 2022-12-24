import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
const router = express.Router();
import {
  createDepartment,
  updateDepartment,
  getDepartmentById,
  deleteDepartment,
  getDepartments,
} from "../controllers/departmentController.js";

router.route("/create").post(protect, admin, createDepartment);
router.route("/").get(getDepartments);

router
  .route("/:id")
  .delete(protect, admin, deleteDepartment)

  .get(protect, getDepartmentById)
  .put(protect, updateDepartment);
export default router;
