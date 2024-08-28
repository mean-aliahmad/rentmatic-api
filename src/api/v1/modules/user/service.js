import UserModel from './model.js';

class UserService {
    static async getData() {
        return { message: 'Hello, world!' };
    }

    static async getUserByEmail(email) {
            return await UserModel.findOne({ email: email }).exec();
    }
}

export default UserService;
