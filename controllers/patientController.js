import asyncHandler from "express-async-handler";
import Patient from "../models/Patient.js";

//@desc- create  new Patient
//@route -POST /api/patients/create
//@access -public
const createPatient = asyncHandler(async (req, res) => {
  //get the Patient inputs from req body
  const { user, first_name, last_name, contact, address, dob, gender } =
    req.body;
  //find Patient with the same email
  const existPatient = await Patient.findOne({ user: user });

  //if the Patient already exists , then throw the error
  if (existPatient) {
    res.status(400);
    throw new Error("Patient already exists");
  }

  //else create the new Patient

  const patient = await Patient.create({
    user,
    first_name,
    last_name,
    contact,
    address,
    dob,
    gender,
  });

  //after the Patient is created, return json data
  if (patient) {
    res.status(201).json({
      id: patient._id,
      user: patient.user,
      first_name: patient.first_name,
      last_name: patient.last_name,
      contact: patient.contact,
      address: patient.address,
      dob: patient.dob,
      gender: patient.gender,
    });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

//@desc- update the Patient profile
//@route -PUT /api/patients/:id
//@access -private

const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (patient) {
    patient.first_name = req.body.first_name || patient.first_name;
    patient.last_name = req.body.last_name || patient.last_name;
    patient.contact = req.body.contact || patient.contact;
    patient.address = req.body.address || patient.address;
    patient.dob = req.body.dob || patient.dob;
    patient.gender = req.body.gender || patient.gender;

    const updatedPatient = await Patient.save();

    res.json({
      _id: updatedPatient._id,
      first_name: updatedPatient.first_name,
      last_name: updatedPatient.last_name,
      contact: updatedPatient.contact,
      address: updatedPatient.address,
      dob: updatedPatient.dob,
      gender: updatedPatient.gender,
    });
  } else {
    res.status(404);
    throw new Error("Patient not found ");
  }
});

//@desc- get all Patients
//@route -GET /api/patients/
//@access -private
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({});
  res.json(patients);
});

//@desc- get Patient by id and update
//@route -GET /api/patients/:id
//@access -private
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
    throw new Error("Patient not found ");
  }
});

//@desc- delete the Patient
//@route -DELETE /api/patients/:id
//@access -private
const deletePatient = asyncHandler(async (req, res) => {
  //find all the Patients
  const patient = await Patient.findById(req.params.id);
  if (patient) {
    await Patient.remove();
    res.json({ msg: "Patient removed" });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

export {
  createPatient,
  updatePatient,
  getPatients,
  getPatientById,
  deletePatient,
};
