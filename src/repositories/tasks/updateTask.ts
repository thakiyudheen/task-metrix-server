import { Task } from '../../models/taskModel';
import { NotFoundError } from '../../utils/errors/customError';

export const updateTask = async (data: any) => {
  try {
    const { _id, ...rest } = data;

    const result = await Task.updateOne(
      { _id: _id },
      { $set: rest } 
    );

    
    const updatedTask = await Task.findById(_id);

    if (!updatedTask) {
      throw new NotFoundError("Task not found after update");
    }


    return updatedTask;
  } catch (error: any) {
    console.error("Error while updating task:", error.message);
    throw error;
  }
};
