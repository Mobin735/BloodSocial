import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user/UserContext";
import VerifyUser from "../utils/VerifyUser";
import Loader from "../pages/Loader";

const Privateroutes = ({ children }) => {
    const {isUserLogged, setUserState} = useContext(UserContext);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await VerifyUser();
           if (!result || result === 'server is down') {
                setLoading(false);
                setUserState((prevState)=>({
                    ...prevState,
                    isUserLogged: false,
                }))
            }
            else {
                setLoading(false);
                setUserState((prevState)=>({
                    ...prevState,
                    isUserLogged: true,
                }))
            }
            return;
        };
        checkAuth();
    },[setUserState]);

    if (loading) {
        // Render loading indicator or placeholder while checking authentication
        return <Loader />;
    }
    else {
        return isUserLogged ? children : <Navigate to='/' />;

    }    
}

export default Privateroutes;
