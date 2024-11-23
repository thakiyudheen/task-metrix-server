import { User } from '../../models/userModel';
import { CustomError } from '../../utils/errors/customError';


interface Users {
    email: string;
    password?: string;
}


export const login = async (data: Users)=> {
    try {
        
        const user = await User.findOne(data);

        return user || null;
    } catch (error: any) {
        console.error("Error during login attempt:", error.message);

        throw new CustomError("An error occurred while logging in", 500);
    }
};
