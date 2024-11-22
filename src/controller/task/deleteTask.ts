import { Request, Response } from 'express';
import { deleteTask } from '../../repositories/deleteTask';

export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        
        
       await deleteTask(req.body);

        
            return res.status(200).json({
                success: true,
                data: {},
                message: 'task deleted successfully!',
            });
        
    } catch (error: any) {
        console.error('Error in getUserController:', error.message);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the user.',
        });
    }
};
