import { toast } from "react-hot-toast"
import { key } from "../config/server"
import axios from "axios"

export const logoutUser = async()=>{
    const response = await axios.get(`${key}/api/v1/user/logout`,{
        withCredentials:true
    })

    if(response) return toast.success("Logout successFully")

    return response.data;
}