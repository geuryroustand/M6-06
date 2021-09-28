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
    },

    password: {
      type: String,
      required: [true, "Password its required"],
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

UserSchema.static.checkPass = async function (email, passPlain) {
  const foundUser = await this.findOne({ email });
  if (foundUser) {
    const isMatch = await bcrypt.compare(plainPw, foundUser.password);

    if (isMatch) {
      return foundUser;
    } else {
      return null;
    }
  }
};
export default model("user", UserSchema);
