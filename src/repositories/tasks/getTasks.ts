import { Task } from '../../models/taskModel';
import { CustomError } from '../../utils/errors/customError';

export const getTasks = async (query:{userId:string, page: number, limit: number}) => {
    try {
        console.log('repo',query);
        
        const { userId, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const tasks = await Task.find({userId})
            .skip(skip) 
            .limit(limit)
            .sort({ createdAt: -1 }); 

        
        const totalTasks = await Task.countDocuments({userId});
        const totalCompletedTasks = await Task.countDocuments({userId,completionStatus:true});
        const totalPages = Math.ceil(totalTasks / limit);

        return {
            tasks,
            totalPages,
            currentPage: page,
            totalTasks,
            totalCompletedTasks
        };
    } catch (error: any) {
        console.error("Error while retrieving tasks:", error.message);

        throw new CustomError("An error occurred while retrieving tasks", 500);
    }
};
