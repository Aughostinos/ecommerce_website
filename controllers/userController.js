import User from "../models/User.js";
import bcrypt from 'bcrypt';


export const login = async function(email, password) {
    const user = await User.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

export const deleteAccount = async (userId) => {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) throw new Error('User not found');
      return { message: 'Account deleted successfully' };
    } catch (error) {
      throw error;
    }
  };