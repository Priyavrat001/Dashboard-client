import { toast } from "react-hot-toast"
import { key } from "../config/server"

export const logoutUser = async()=>{
    const response = await fetch(`${key}/api/v1/user/logout`,{
        method:"GET",
        credentials:"include"
    })

    if(!response.json) return toast.error("Not able to logout");

    const responseJson = await response.json();

    return responseJson
}