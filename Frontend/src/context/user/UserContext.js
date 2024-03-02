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
        isUserLogged: null,
    };
    const [userState, setUserState] = useState(initialState);
    
    return (
        <UserContext.Provider value={{ ...userState, setUserState}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextWrapper;
