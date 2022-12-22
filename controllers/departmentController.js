import asyncHandler from "express-async-handler";
import Department from "../models/department";

//@desc- create  new Department
//@route -POST /api/departments/create
//@access -public
const createDepartment = asyncHandler(async (req, res) => {
  //get the Department inputs from req body
  const { title, description } = req.body;
  //find Department with the same email
  const existDepartment = await Department.findOne({ title: title });

  //if the Department already exists , then throw the error
  if (existDepartment) {
    res.status(400);
    throw new Error("Department already exists");
  }

  //else create the new Department

  const department = await Department.create({
    title,
    description,
  });

  //after the Department is created, return json data
  if (department) {
    res.status(201).json({
      id: department._id,
      title: department.title,
      description: department.description,
    });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

//@desc- update the department profile
//@route -PUT /api/departments/:id
//@access -private

const updateDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (department) {
    department.title = req.body.title || department.title;
    department.description = req.body.description || department.description;

    const updatedDepartment = await Department.save();

    res.json({
      _id: updatedDepartment._id,
      title: updatedDepartment.title,
      description: updatedDepartment.description,
    });
  } else {
    res.status(404);
    throw new Error("Department not found ");
  }
});

//@desc- get all Departments
//@route -GET /api/departments/
//@access -private
const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({});
  res.json(departments);
});

//@desc- get Department by id and update
//@route -GET /api/departments/:id
//@access -private
const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (department) {
    res.json(department);
  } else {
    res.status(404);
    throw new Error("Department not found ");
  }
});

//@desc- delete the Department
//@route -DELETE /api/departments/:id
//@access -private
const deleteDepartment = asyncHandler(async (req, res) => {
  //find all the Departments
  const department = await Department.findById(req.params.id);
  if (department) {
    await department.remove();
    res.json({ msg: "Department removed" });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

export {
  createDepartment,
  updateDepartment,
  getDepartments,
  getDepartmentById,
  deleteDepartment,
};
