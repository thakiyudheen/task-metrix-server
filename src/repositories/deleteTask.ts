import { Task } from '../models/taskModel';


export const deleteTask = async (data:any) =>{
    try{
        await  Task.deleteOne(data)
        
    }catch(error:any){
        console.log("error while delete Task");
        
    }
} 