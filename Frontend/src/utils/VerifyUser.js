import axios from "axios";

function getCookie() {
    const cookies = document.cookie;
    const cookieName = 'access_token'; 
    const cookieArray = cookies.split('; ');
    const isCookieFound = cookieArray.find(cookie => cookie.trim().startsWith(`${cookieName}=`));

    if (isCookieFound) {
        return true;
    }
    return false;
}

const VerifyUser = async () => {
    const isCookieExist = getCookie();
    if (isCookieExist) {
        try {
            // sending token to server via cookie to verify 
            const response = await axios.get(`${process.env.REACT_APP_API}/auth/verify`, {
                withCredentials: true,
                mode: 'cors',
            });
            // console.log("bakchodi: "+response.data.message);
            if (response.data.message === 'invalid token' && response.data.message === 'token not found') {
                const cookie_name = "access_token";
                document.cookie = cookie_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                return false;
            }
            else {
                return response.data.user;
            }
        } catch (error) {
            return false;
        }
    }
    else{
        return false;
    }
};

export default VerifyUser;

