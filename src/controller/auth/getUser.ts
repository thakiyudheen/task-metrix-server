import { getUser } from '../../repositories/auth';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, NotFoundError } from '../../utils/errors/customError';

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        if (!req.user) {
            throw new UnauthorizedError("The user is not authenticated");
        }

        
        const user = await getUser({ _id: req.user._id, email: req.user.email });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        
        res.status(200).json({
            success: true,
            data: user,
            message: "User retrieved successfully",
        });

    } catch (error) {
        next(error);
    }
};
