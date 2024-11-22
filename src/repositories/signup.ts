import{ User} from '../models/userModel'

export const signup = async (data:any) =>{
    try{
        console.log('this is signup data',data)
        const user = await  User.create(data)
        return user;
    }catch(error:any){
        console.log("error while adding user data");
        
    }
} 