import { Request, Response } from 'express';
import { getTasks } from '../../repositories/tasks';

interface Query {
  userId: string;
  page: number;
  limit: number;
}

export const getTaskController = async (req: Request, res: Response) => {
  try {
    console.log('Incoming query:', req.query);

    const { userId, page, limit } = req.query;


    if (
      typeof userId === 'string' &&
      typeof page === 'string' &&
      typeof limit === 'string'
    ) {
      const query: Query = {
        userId,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
      };

      console.log('Parsed query:', query);

      const task = await getTasks(query);

      console.log('Retrieved tasks:', task);

      if (task) {
        return res.status(200).json({
          success: true,
          data: task,
          message: 'Tasks retrieved successfully!',
        });
      } else {
        return res.status(404).json({
          success: false,
          data: {},
          message: 'No tasks found!',
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters!',
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
