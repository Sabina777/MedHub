import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    contact: {
      type: Number,
    },
    description: {
      type: String,
    },
    speciality: {
      type: String,
    },
    image_url: {
      type: String,
    },
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
