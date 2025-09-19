import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  loginPassword: { type: String, required: true },
  appPassword: { type: String, required: true },
  refreshToken:{type:String}
});
UserSchema.methods.isLoginPasswordCorrect = async function (loginPassword) {
  return await bcrypt.compare(loginPassword, this.loginPassword);
}
UserSchema.methods.generateAccessToken= function(){
  return jwt.sign(
    {
      _id : this._id,
      email:this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
UserSchema.methods.generateRefreshToken= function(){
  return jwt.sign(
    {
      _id : this._id,
      email:this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const User = mongoose.model('User', UserSchema);
