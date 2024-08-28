import UserModel from '../user/model.js';

class adminController {
    static async login(req, res) {
        try {
            const { user_id: userId, propertyName, number_of_rooms: noOfRooms, allowed_for: allowedFor, rentType, rent, address, city, state, zipcode, landmark } = req.body;
            const newUser = new UserModel({
                userId,
                propertyName,
                noOfRooms,
                allowedFor,
                rentType,
                rent,
                address,
                city,
                state,
                zipcode,
                landmark,
            });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default adminController;
