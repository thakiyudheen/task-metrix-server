import { Task } from '../../models/taskModel';
import { CustomError } from '../../utils/errors/customError';

export const createTask = async (data: Record<string, any>) => {
    try {
        
        const task = await Task.create(data);

        return task;
    } catch (error: any) {
        console.error("Error while creating task:", error.message);
        throw new CustomError("An error occurred while creating the task", 500);
    }
};
