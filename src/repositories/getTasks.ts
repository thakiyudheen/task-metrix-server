import { Task } from '../models/taskModel';


export const getTasks = async (data:any) =>{
    try{
        const task = await Task.find(data)
        return task ;

    }catch(error:any){
        console.log("error while gettasks");
        
    }
} 