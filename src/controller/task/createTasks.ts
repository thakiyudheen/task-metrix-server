import { createTask } from '../../repositories/tasks';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ValidationError } from '../../utils/errors/customError';

export const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Received task data:', req.body);
         
         
         
        if (req.user==undefined) {
            throw new UnauthorizedError("The user is not authenticated");
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            throw new ValidationError("Task data is required");
        }

        
        const task = await createTask(req.body);

        if (!task) {
            throw new ValidationError("Task creation failed");
        }

       
        res.status(200).json({
            success: true,
            data: task.newTask,
            message: "Task added successfully!",
        });
    } catch (error) {
        next(error);
    }
};
