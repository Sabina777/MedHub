import mongoose from "mongoose";
const BookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
