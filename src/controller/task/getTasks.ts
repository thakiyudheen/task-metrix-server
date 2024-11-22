import { Request, Response } from 'express';
import { getTasks } from '../../repositories/getTasks';

export const getTaskController = async (req: Request, res: Response) => {
    try {
        
        console.log('the task',req.query);

        
        const task = await getTasks(req.query);

        console.log('the real task',task);
        
        if (task) {
            return res.status(200).json({
                success: true,
                data: task,
                message: 'task get successfully!',
            });
        } else {
            return res.status(200).json({
                success: false,
                data:{},
                message: 'task find filed!',
            });
        }

    } catch (error: any) {
        console.error('Error in cateatTaskController:', error.message);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the user.',
        });
    }
};
