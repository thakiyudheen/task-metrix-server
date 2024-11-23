import { User } from '../../models/userModel';
import { CustomError } from '../../utils/errors/customError';

export const getUser = async (data: Record<string, any>) => {
    try {
        
        const user = await User.findOne(data);

        return user;
    } catch (error: any) {
        console.error("Error while getting user:", error.message);

        throw new CustomError("An error occurred while retrieving the user", 500);
    }
};
