import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";
import Doctor from "../models/doctor.js";
//@desc- create  new Booking
//@route -POST /api/bookings/create
//@access -public
const createBooking = asyncHandler(async (req, res) => {
  //get the Booking inputs from req body
  const { doctor_id, description, date, time, status } = req.body;
  ///pass user id, department id and doctor id
  const booking = await Booking.create({
    user: req.user._id,
    doctor_id,
    description,
    date,
    time,
    status,
  });

  //after the Booking is created, return json data
  if (booking) {
    res.status(201).json({
      id: booking._id,
      user: booking.user,
      doctor_id: booking.doctor_id,
      description: booking.description,
      date: booking.date,
      time: booking.time,
      status: booking.status,
    });
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

//@desc- update the Booking profile
//@route -PUT /api/bookings/:id
//@access -private

const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    booking.department = req.body.department || booking.department;
    booking.doctor = req.body.doctor || booking.doctor;
    booking.description = req.body.description || booking.description;
    booking.date = req.body.date || booking.date;
    booking.time = req.body.time || booking.time;
    booking.status = req.body.status || booking.status;

    const updatedBooking = await Booking.save();

    res.json({
      _id: updatedBooking._id,
      department: updatedBooking.department,
      doctor: updatedBooking.doctor,
      description: updatedBooking.description,
      date: updatedBooking.date,
      time: updatedBooking.time,
      status: updatedBooking.status,
    });
  } else {
    res.status(404);
    throw new Error("Booking not found ");
  }
});

//@desc- get all Bookings
//@route -GET /api/bookings/
//@access -private
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({});
  res.json(bookings);
});

//@desc- get all Bookingsof loggged in user
//@route -GET /api/bookings/user
//@access -private
const getBookingsByUser = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate(
    "doctor_id",
    "user first_name last_name contact speciality "
  );
  res.json(bookings);
});
//@desc- get Booking by id and update
//@route -GET /api/bookings/:id
//@access -private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error("Booking not found ");
  }
});

//@desc- delete the Booking
//@route -DELETE /api/bookings/:id
//@access -private
const deleteBooking = asyncHandler(async (req, res) => {
  //find all the Bookings
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    await Booking.remove();
    res.json({ msg: "Booking removed" });
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

export {
  createBooking,
  updateBooking,
  getBookings,
  getBookingById,
  deleteBooking,
  getBookingsByUser,
};
