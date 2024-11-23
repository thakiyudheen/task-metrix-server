import { Task } from '../../models/taskModel';
import { CustomError } from '../../utils/errors/customError';

export const deleteTask = async (filter: Record<string, any>) => {
    try {
        const result = await Task.deleteOne(filter);

        if (result.deletedCount === 0) {
            throw new CustomError("Task not found or could not be deleted", 404);
        }

        return result;
    } catch (error: any) {
        console.error("Error while deleting task:", error.message);
        throw new CustomError("An error occurred while deleting the task", 500);
    }
};
