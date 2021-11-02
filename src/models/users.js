import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { model, Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required "],
    },
    lastName: {
      type: String,
      required: [true, "LastName its required"],
    },
    email: {
      type: String,
      required: [true, "Email its required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password its required"],
      select: false,
    },

    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const newUser = this;
  const plainPw = newUser.password;

  if (newUser.isModified("password")) {
    newUser.password = await bcrypt.hash(plainPw, 12);
  }

  next();
});

UserSchema.statics.checkPass = async function (email, passPlain) {
  const foundUser = await this.findOne({ email }).select("+password");

  console.log(foundUser);

  if (foundUser) {
    const isMatch = await bcrypt.compare(passPlain, foundUser.password);
    if (isMatch) {
      return foundUser;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
export default model("user", UserSchema);
