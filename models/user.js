import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//method to check the entered password and password of the database which is in encrypted form
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//before we save, encrypt the password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
export default User;
