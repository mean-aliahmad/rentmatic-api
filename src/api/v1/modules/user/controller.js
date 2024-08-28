import { ObjectId } from 'mongodb';

import UserModel from './model.js';

import { put } from "@vercel/blob";

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import UserService from './service.js';

class UserController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const userDoc = await UserService.getUserByEmail(email);
            // Convert Mongoose document to plain object
            const userData = userDoc.toObject();
            if (userData) {
                userData._id = userData._id.toString(); // Convert ObjectId to string
                // Compare passwords asynchronously
                const decrypt = await bcrypt.compareSync(password, userData.password);

                if (decrypt) {
                    const token = jwt.sign({ id: userData._id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

                    if (token) {
                        // Convert the token to a buffer
                        const buffer = Buffer.from(token, 'utf8');

                        // Convert the buffer to a hexadecimal string
                        const hexToken = buffer.toString('hex');
                        userData.token = hexToken;
                        res.status(200).send({ message: 'Logged in successfully.', data: userData});
                    } else {
                        res.status(400).send({ message: 'Error creating login token.' });
                    }
                } else {
                    res.status(400).send({ message: 'Invalid Password. Please check your password.' });
                }
            } else {
                res.status(400).send({ message: 'Invalid Email. Please check your email.' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const { firstName, lastName, email, username, password, address, city, state, zipcode, landmark } = req.body;
            let profilePicture;
            if (req.files) {
                // Extract file details
                const files = req.files
                const fileName = files[0].originalname;
                const { url } = await put(fileName, files[0].buffer, { access: "public" });
                profilePicture = url;
            }
            const userData = await UserModel.findOne({ email: email });
            if (!userData) {
                const newUser = new UserModel({
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                    profilePicture,
                    address,
                    city,
                    state,
                    zipcode,
                    landmark,
                });
                await newUser.save();
                res.status(201).json(newUser);
            }
            else {
                res.status(400).send({ message: 'User already exists' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserDetails(req, res) {
        try {
            const userId = req.query.user_id;
            const objId = ObjectId.createFromHexString(userId);
            const results = await UserModel.aggregate([
                {
                    $match: { _id: objId } // Match user by _id
                },
                {
                    $lookup: {
                        from: 'properties', // Collection name in MongoDB
                        localField: '_id', // Field from Users collection
                        foreignField: 'user_id', // Field from Properties collection
                        as: 'properties' // The name of the array field to add
                    }
                },
                {
                    $project: {
                        first_name: 1,
                        last_name: 1,
                        address: 1,
                        properties: {
                            propertyName: 1,
                            rent: 1,
                            allowedFor: 1
                        }
                    }
                }
            ]);

            res.json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserController;
