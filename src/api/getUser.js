import {key} from "../config/server"

export const getUser = async () => {
    try {
        const response = await fetch(`${key}/api/v1/user/me`, {
            method: "GET",
            credentials: "include",  // Send credentials (cookies)
        });

        if(!response.ok) throw new Error("User not found");

        const responseData = await response.json();
        return responseData
    } catch (error) {
        console.error("An error occurred: ", error);
    }
};

