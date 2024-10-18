import { toast } from "react-hot-toast";
import { key } from "../config/server";

// User login function to be called from a component
export const userLogin = async (username, password) => {
    try {
        const response = await fetch(`${key}/api/v1/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            }),
            credentials:"include"
        });

        // Check if the response is not ok
        if (!response.ok) {
            const errorData = await response.json(); // Extract the error message from the response body
            toast.error(errorData.message || "Login failed");
            return null; // Return null or handle error in the calling component
        }

        // Parse and return the response data
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        toast.error("An error occurred while logging in");
        return null;
    }
};
