import {toast} from "react-hot-toast"
import { key } from "../config/server";
import axios from "axios";

export const userSignup = async(personName, username, password)=>{
    const response = await axios.post(`${key}/api/v1/user/login`, {
        personName,
        username,
        password,
    }, {withCredentials:true});

    return response.data;
}