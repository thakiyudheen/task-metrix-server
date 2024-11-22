import { createTask } from '../../repositories/createTask';
import { getUser } from '../../repositories';
import { Request, Response } from 'express';

export const createTaskController = async (req: Request, res: Response) => {
    try {
        
        console.log('the task',req.body);
        
        // if (!req.user) {
        //     return res.status(401).json({
        //         success: false,
        //         message: 'The user is not authenticated!',
        //     });
        // }

        
        const task = await createTask(req.body);

        console.log('the real task',task);
        
        if (task) {
            return res.status(200).json({
                success: true,
                data: task,
                message: 'task added successfully!',
            });
        } else {
            return res.status(200).json({
                success: false,
                data:{},
                message: 'task crettion filed!',
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
