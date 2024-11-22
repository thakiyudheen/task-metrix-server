import{ User} from '../models/userModel'

export const login = async (data:any) =>{
    try{
        const user = await  User.findOne(data)
        return user;

    }catch(error:any){
        console.log("error while login");
        
    }
} 