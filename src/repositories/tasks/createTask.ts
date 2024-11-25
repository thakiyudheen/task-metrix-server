import { Task } from '../../models/taskModel';
import { CustomError } from '../../utils/errors/customError';

export const createTask = async (data: Record<string, any>) => {
    try {
        const { page, limit, ...rest } = data;
        const task = await Task.create(rest);

        const skip = (page - 1) * limit;

        const totalCount = await Task.countDocuments({userId:rest.userId});
        const tasks = await Task.find({userId:rest.userId})
            .skip(skip)
            .limit(limit)
            .exec();

        const totalPages = Math.ceil(totalCount / limit);

        return {
            tasks,
            totalCount,
            totalPages,
            currentPage: page,
            newTask: tasks,
        };
    } catch (error: any) {
        console.error("Error while creating and fetching tasks:", error.message);
        throw new CustomError("An error occurred while creating or fetching tasks", 500);
    }
};
