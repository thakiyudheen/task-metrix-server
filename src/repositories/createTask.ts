import { Task } from '../models/taskModel';


export const createTask = async (data:any) =>{
    try{
        console.log();
        
        const task = await Task.create(data)
        return task;

    }catch(error:any){
        console.log("error while createTask", error.message);
        
    }
} 