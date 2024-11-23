import { User } from '../../models/userModel';
import { CustomError } from '../../utils/errors/customError';

interface SignupData {
    email: string;
    password: string;
    username: string;
    isGAuth: boolean;
}

export const signup = async (data: SignupData) => {
    try {
        

        const user = await User.create(data);

        return user; 
    } catch (error: any) {
        console.error('Error while adding user data:', error.message);

        throw new CustomError('An error occurred while signing up the user.', 500);
    }
};
