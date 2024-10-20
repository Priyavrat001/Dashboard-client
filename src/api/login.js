import { toast } from "react-hot-toast";
import { key } from "../config/server";
import axios from "axios";

// User login function to be called from a component
export const userLogin = async (username, password) => {
    try {
        const response = await axios.post(`${key}/api/v1/user/login`, {
            username,
            password,
        }, {withCredentials:true});

        return response.data;

    } catch (error) {
        toast.error("An error occurred while logging in");
        return null;
    }
};
