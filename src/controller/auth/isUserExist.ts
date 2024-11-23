import { Request, Response, NextFunction } from 'express';
import { isUserExist } from '../../repositories/auth';

export const isUserExistController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.params.email;

    if (!email) {
      return next(new Error("Email is required"));
    }

    const user = await isUserExist({ email });
    
    console.log('this si user',user);
       if(user){
           res.status(200).json({
             success: true,
             data:user,
             message:'user exist!!'
           });
       }else{
        res.status(200).json({
            success: false,
            data:{},
            message:'user not exist!!'
          });
       }
    
    
  } catch (error) {
    next(error); 
  }
};
