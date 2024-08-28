import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: false, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false },
  role: { type: String, enum: ['Admin', 'User', 'Subscriber'], default: 'User' },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  landmark: { type: String },
  isDeleted: { type: Boolean, default: false },
  isActivated: { type: Boolean, default: true },
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
// Create and export the User model
const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
