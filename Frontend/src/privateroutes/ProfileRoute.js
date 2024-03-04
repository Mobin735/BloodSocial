import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import VerifyUser from "../utils/VerifyUser";
import Loader from "../pages/Loader";
import { UserContext } from "../context/user/UserContext";

const ProfileRoute = ({ children }) => {
    const { isUserLogged, setUserState } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {

            const result = await VerifyUser();
            if (result) {
                setUserState((prevstate) => ({
                    ...prevstate,
                    email: result.email,
                    fullname: result.fullname,
                    state: result.state,
                    city: result.city,
                    bloodType: result.bloodtype,
                    mobile: result.mobile,
                    isUserLogged: true
                }))
            }
            else {
                setUserState((prevstate)=>({
                    ...prevstate,
                    isUserLogged: false
                }))
            }
            setLoading(false);
        };
        checkAuth();
        return;
    }, [setUserState]);

    if (loading) {
        // Render loading indicator or placeholder while checking authentication
        return <Loader />;
    }
    else {
        return isUserLogged ? children : <Navigate to='/login' />;
    }
}

export default ProfileRoute;
