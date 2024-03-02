import axios from "axios";

const VerifyUser = async () => {

    try {
        const response = await axios.get('http://localhost:5000/auth/verify', {
            withCredentials: true,
        });
        if (response.data.message === 'invalid token') {
            const cookie_name = "access_token";
            document.cookie = cookie_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            return false;
        }
        else {
            return response.data.user;
        }
    } catch (error) {
        return "server is down";
    }


};

export default VerifyUser;

