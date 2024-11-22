import { getUser } from '../../repositories';
import { Request, Response } from 'express';

export const getUserController = async (req: Request, res: Response) => {
    try {
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'The user is not authenticated!',
            });
        }

        
        const user = await getUser({_id:req.user._id,email:req.user.email});

        console.log('the real user',user);
        
        if (user) {
            return res.status(200).json({
                success: true,
                data: user,
                message: 'User retrieved successfully!',
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }

    } catch (error: any) {
        console.error('Error in getUserController:', error.message);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the user.',
        });
    }
};
