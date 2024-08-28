import mongoose, { now } from 'mongoose';
// Define the user schema
const userSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyName: { type: String, required: true },
    number_of_rooms: { type: String, required: true, unique: true },
    allowed_for: { type: String, required: true },
    rentType: { type: String, required: true },
    rent: { type: Number },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    landmark: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: true },
}, { timestamps: true, default: now() }); // Automatically add createdAt and updatedAt

// Create and export the User model
const UserModel = mongoose.model('Properties', userSchema);

export default UserModel;
