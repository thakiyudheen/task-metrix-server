import { Request, Response } from 'express';
import { getTasks } from '../../repositories/getTasks';
import { updateTask } from '../../repositories';

export const updateController = async (req: Request, res: Response) => {
    try {
        
        console.log('the task',req.body);
    
        const update = await updateTask(req.body)
        const task = await getTasks({userId:req.body.userId});

        if (task) {
            return res.status(200).json({
                success: true,
                data: task,
                message: 'task updated successfully!',
            });
        } else {
            return res.status(200).json({
                success: false,
                data:{},
                message: 'task update filed!',
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
