import { UserModel } from '@/type/user';
import { User  } from '../../models/userModel';
import { CustomError } from '../../utils/errors/customError';

interface User {
    _id?: string;
    email: string;
    password?: string;
}

export const isUserExist = async (data: User): Promise<any> => {
    try {
        
        const user = await User.findOne(data);

       
        return user || null;
    } catch (error: any) {
        console.error("Error while finding user:", error.message);
        throw new CustomError("An error occurred while checking for user existence", 500);
    }
};
