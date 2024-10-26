import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  }
})

const User = mongoose.model('User', userSchema)
export default User