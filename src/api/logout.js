import { toast } from "react-hot-toast"
import { key } from "../config/server"

export const logoutUser = async()=>{
    const response = await fetch(`${key}/api/v1/user/logout`,{
        method:"GET",
        credentials:"include"
    })

    if(!response.ok) return toast.error("Not able to logout");

    const responseJson = await response.json();

    if(responseJson) return toast.success("Login SuccessFully")

    return responseJson
}