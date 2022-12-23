import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
const router = express.Router();
import {
  createBooking,
  updateBooking,
  getBookings,
  getBookingById,
  deleteBooking,
} from "../controllers/bookingController.js";

router.route("/create").post(protect, createBooking);

router
  .route("/:id")
  .delete(protect, admin, deleteBooking)
  .get(protect, getBookingById)
  .put(protect, updateBooking);
export default router;
