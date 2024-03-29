import axios from "axios";
import GetCookie from "./GetCookie";



const VerifyUser = async () => {
    const isCookieExist = GetCookie();
    if (isCookieExist) {
        console.log("Sending req to server");
        try {
            // sending token to server via cookie to verify 
            const response = await axios.get(`${process.env.REACT_APP_API}/auth/verify`,{
                headers: {
                    token: isCookieExist,
                },
                // withCredentials: true,
                // mode: 'cors',
            });
            if (response.data.message === 'invalid token' && response.data.message === 'token not found') {
                const cookie_name = "access_token";
                document.cookie = cookie_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                return false;
            }
            else {
                return true;
            }
        } catch (error) {
            console.log("error while verifying");
            return false;
        }
    }
    else{
        return false;
    }
};

export default VerifyUser;

