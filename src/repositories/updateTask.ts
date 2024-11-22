import { Task } from '../models/taskModel';


export const updateTask = async (data:any) =>{
    try{
        await  Task.updateOne({_id:data._id},{completionStatus:true})
        
    }catch(error:any){
        console.log("error while update Task");
        
    }
} 