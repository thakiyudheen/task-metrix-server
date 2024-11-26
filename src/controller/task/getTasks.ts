import { Request, Response } from 'express';
import { getTasks } from '../../repositories/tasks';

interface Query {
  userId: string;
  page: number;
  limit: number;
  completionStatus?: boolean; 
}

export const getTaskController = async (req: Request, res: Response) => {
  try {
    const { userId, page, limit, completionStatus }: Query = req.query as any;
    console.log(req.query);
    

    if (!userId || !page || !limit) {
      return res.status(400).json({
        success: false,
        message: 'Missing required query parameters (userId, page, limit).',
      });
    }

    if (isNaN(page) || page < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page must be a positive number.',
      });
    }

    if (isNaN(limit) || limit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be a positive number.',
      });
    }

    const query: Query = {
      userId,
      page: Number(page),
      limit: Number(limit),
      ...(completionStatus !== undefined && { completionStatus }), 
    };

    const tasks = await getTasks(query);

    console.log('fileter',tasks);
    
    
    if (tasks) {
      return res.status(200).json({
        success: true,
        data: tasks,
        message: 'Tasks retrieved successfully!',
      });
    } else {
      return res.status(404).json({
        success: false,
        data: [],
        message: 'No tasks found!',
      });
    }
  } catch (error: any) {
    console.error('Error in getTaskController:', error.message);

    return res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving tasks.',
    });
  }
};
