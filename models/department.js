import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },
});

const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
