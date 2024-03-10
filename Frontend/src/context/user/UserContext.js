import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextWrapper = ({children}) => {
    
    const initialState = {
        email: '',
        fullname: '',
        mobile: '',
        bloodType: '',
        state: '',
        city: '',
        isUserLogged: false,
    };

    const [userState, setUserState] = useState(initialState);
    const [donarSearches, setDonarSearches] = useState([]);
    const [nearByLoader, setNearByLoader] = useState(false);
    const [notification, setNotification] = useState("");

    const props ={
        ...userState,
        setUserState,
        donarSearches,
        setDonarSearches,
        nearByLoader, 
        setNearByLoader, 
        notification, 
        setNotification
    }

    return (
        <UserContext.Provider value={{...props}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextWrapper;
