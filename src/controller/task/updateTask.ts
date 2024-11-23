import { Request, Response, NextFunction } from 'express';
import { getTasks } from '../../repositories/tasks';
import { updateTask } from '../../repositories/tasks';
import { ValidationError, NotFoundError } from '../../utils/errors/customError';

export const updateController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        console.log('Updating task:', req.body);

        const updateResult = await updateTask(req.body);
        
        
        
        res.status(200).json({
            success: true,
            data: updateResult,
            message: 'Task updated successfully!',
        });
    } catch (error) {
        next(error);
    }
};
