import { Request, Response, NextFunction } from 'express';
import { deleteTask } from '../../repositories/tasks';

export const deleteTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.query);
        
        await deleteTask(req.query);

        res.status(200).json({
            success: true,
            data: {},
            message: 'Task deleted successfully!',
        });
    } catch (error) {
        next(error);
    }
};
