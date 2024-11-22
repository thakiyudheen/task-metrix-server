import { User } from '../models/userModel'


interface User{
    _id?:string,
    email:string,
    password?: string,

}
export const isUserExist = async (data:User) => {
    try {
        const user = await User.findOne(data)
        if (user) {
            return user
        } else {
            return null
        }

    } catch (error: any) {
        console.log("error while finding");

    }
} 