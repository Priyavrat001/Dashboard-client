import {key} from "../config/server"
import axios from "axios"

export const getUser = async () => {
    try {
        const response = await axios.get(`${key}/api/v1/user/me`,{
            withCredentials:true
        });

        return response.data;
    } catch (error) {
        console.error("An error occurred: ", error);
    }
};

