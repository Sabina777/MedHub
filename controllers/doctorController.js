import asyncHandler from "express-async-handler";
import Doctor from "../models/doctor.js";

//@desc- create  new Doctor
//@route -POST /api/doctors/create
//@access -public
const createDoctor = asyncHandler(async (req, res) => {
  //get the Doctor inputs from req body
  const {
    first_name,
    last_name,
    contact,
    description,
    speciality,
    department_id,
    image_url,
  } = req.body;
  //find Doctor with the same email
  const existDoctor = await Doctor.findOne({ user: req.user._id });

  //if the Doctor already exists , then throw the error
  if (existDoctor) {
    res.status(400);
    throw new Error("Doctor already exists");
  }

  //else create the new Doctor

  const doctor = await Doctor.create({
    user: req.user._id,
    first_name,
    last_name,
    contact,
    description,
    speciality,
    department_id,
    image_url,
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
      department_id: doctor.department_id,
      image_url: doctor.image_url,
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
    doctor.department_id = req.body.department_id || doctor.department_id;
    doctor.image_url = req.body.image_url || doctor.image_url;

    const updatedDoctor = await doctor.save();

    res.json({
      _id: updatedDoctor._id,
      first_name: updatedDoctor.first_name,
      last_name: updatedDoctor.last_name,
      contact: updatedDoctor.contact,
      description: updatedDoctor.description,
      speciality: updatedDoctor.speciality,
      department_id: updatedDoctor.department_id,
      image_url: updatedDoctor.image_url,
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

//@desc- list Doctor by department
//@route -GET /api/doctors/:department_id
//@access -private
const getDoctorsByDepartment = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({
    department_id: req.params.department_id,
  });
  res.json(doctors);
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

export {
  createDoctor,
  updateDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
  getDoctorsByDepartment,
};
