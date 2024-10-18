import {toast} from "react-hot-toast"
import { key } from "../config/server";

export const userSignup = async(personName, username, password)=>{
    const response = await fetch(`${key}/api/v1/user/new`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(
            {
                name:personName,
                username:username,
                password:password
            }
        ),
        credentials:"include"
    })

    if(!response.ok) return toast.error(response.statusText);

    const responseData = response.json();

    return responseData
}