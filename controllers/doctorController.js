import asyncHandler from "express-async-handler";
import Doctor from "../models/Doctor.js";

//@desc- create  new Doctor
//@route -POST /api/doctors/create
//@access -public
const createDoctor = asyncHandler(async (req, res) => {
  //get the Doctor inputs from req body
  const {
    user,
    first_name,
    last_name,
    contact,
    description,
    speciality,
    department,
  } = req.body;
  //find Doctor with the same email
  const existDoctor = await Doctor.findOne({ user: user });

  //if the Doctor already exists , then throw the error
  if (existDoctor) {
    res.status(400);
    throw new Error("Doctor already exists");
  }

  //else create the new Doctor

  const doctor = await Doctor.create({
    user,
    first_name,
    last_name,
    contact,
    description,
    speciality,
    department,
  });

  //after the Doctor is created, return json data
  if (doctor) {
    res.status(201).json({
      id: doctor._id,
      user: doctor.user,
      first_name: doctor.first_name,
      last_name: doctor.last_name,
      contact: doctor.contact,
      description: doctor.description,
      speciality: doctor.speciality,
      department: doctor.department,
    });
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

//@desc- update the Doctor profile
//@route -PUT /api/doctors/:id
//@access -private

const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    doctor.first_name = req.body.first_name || doctor.first_name;
    doctor.last_name = req.body.last_name || doctor.last_name;
    doctor.contact = req.body.contact || doctor.contact;
    doctor.description = req.body.description || doctor.description;
    doctor.speciality = req.body.speciality || doctor.speciality;
    doctor.department = req.body.department || doctor.department;

    const updatedDoctor = await Doctor.save();

    res.json({
      _id: updatedDoctor._id,
      first_name: updatedDoctor.first_name,
      last_name: updatedDoctor.last_name,
      contact: updatedDoctor.contact,
      description: updatedDoctor.description,
      speciality: updatedDoctor.speciality,
      department: updatedDoctor.department,
    });
  } else {
    res.status(404);
    throw new Error("Doctor not found ");
  }
});

//@desc- get all Doctors
//@route -GET /api/doctors/
//@access -private
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({});
  res.json(doctors);
});

//@desc- get Doctor by id and update
//@route -GET /api/Doctors/:id
//@access -private
const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404);
    throw new Error("Doctor not found ");
  }
});

//@desc- delete the Doctor
//@route -DELETE /api/Doctors/:id
//@access -private
const deleteDoctor = asyncHandler(async (req, res) => {
  //find all the Doctors
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    await Doctor.remove();
    res.json({ msg: "Doctor removed" });
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

export { createDoctor, updateDoctor, getDoctors, getDoctorById, deleteDoctor };
