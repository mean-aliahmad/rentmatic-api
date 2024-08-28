import mongoose from 'mongoose';

import dotenv from 'dotenv';

import UserModel from '../src/api/v1/modules/user/model.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      tls: false, // Set to false for local MongoDB unless it's configured for TLS/SSL
    });
    await createAdminUser();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

const createAdminUser = async () => {
  try {
    // Check if an admin user already exists
    const adminExists = await UserModel.findOne({ role: 'Admin' });
    if (!adminExists) {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD; // Replace with a secure password

      // Create the admin user
      const adminUser = new UserModel({
        firstName: process.env.FIRST_NAME,
        lastName: process.env.LAST_NAME,
        username: process.env.ADMIN_USERNAME,
        email: adminEmail,
        password: adminPassword,
        role: 'Admin',
      });

      // Save to the database
      await adminUser.save();
      console.log('Admin user created successfully.');
    } else {
      console.log(`Hello ${process.env.ADMIN_USERNAME}`);
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

export default connectDB;
