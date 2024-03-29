import Navbar from "../../components/medium/Navbar/Navbar";
import Herosection from "../../components/medium/Herosection/Herosection";
import Footer from "../../components/medium/Footer/Footer";
import Whitetext from "../../components/small/Whitetext";
import { useContext, useState } from "react";
import './Profile.css';
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import GetCookie from "../../utils/GetCookie";
import VerifyUser from "../../utils/VerifyUser";
import { useEffect } from "react";
import Loader from "../Loader";
import { Navigate } from "react-router-dom";
import MiniLoader from "../../components/small/MiniLoader";
import Notification from "../../components/small/Notification";

const citiesData = {
    Gujarat: ["Palanpur", "Surat", "Ahmedabad", "Patan"],
    Maharashtra: ["Mumbai", "Thane"]
}

export default function Profile() {
    const { email, fullname, mobile, bloodType, state, city, isUserLogged, setUserState } = useContext(UserContext);
    const [buttonState, setButtonState] = useState(true);
    const [cachedLocation, setCachedLocation] = useState([]);
    const [FullName, setFullName] = useState(fullname);
    const [State, setState] = useState(state);
    const [City, setCity] = useState(city);
    const [BloodType, setBloodType] = useState(bloodType);
    const [Mobile, setMobile] = useState(mobile);
    const [UserLocation, setUserLocation] = useState([]);
    const [updatedTime, setUpdatedTime] = useState(0);
    const [cities, setCities] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataUpdate, setDataUpdate] = useState(false);
    const [miniLoader, setMiniLoader] = useState(false);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            const result = await VerifyUser();
            if (result) {
                const cookie = GetCookie();
                const userData = await axios.get(`${process.env.REACT_APP_API}/userdata/getdata`, {
                    headers: {
                        token: cookie,
                    },
                });
                if (userData.data.user?.email !== undefined && userData.data.message !== 'error fetching data') {
                    setUserState((prevstate) => ({
                        ...prevstate,
                        email: userData.data.user.email,
                        fullname: userData.data.user.fullname,
                        state: userData.data.user.state,
                        city: userData.data.user.city,
                        bloodType: userData.data.user.bloodtype,
                        mobile: userData.data.user.mobile ?? '',
                        isUserLogged: true
                    }))

                    setFullName(userData.data.user.fullname);
                    setState(userData.data.user.state);
                    setCity(userData.data.user.city);
                    setBloodType(userData.data.user.bloodtype);
                    setMobile(userData.data.user.mobile ?? '');
                    setDataUpdate(false);
                }
                else {
                    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    setUserState((prevstate) => ({
                        ...prevstate,
                        isUserLogged: false
                    }))
                }
            }
            setLoader(false);
            //getting user location access permission
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // console.log(position);
                        setUserLocation([position.coords.longitude, position.coords.latitude])
                        setUpdatedTime(position.timestamp);
                    }
                )
            }
        };
        checkAuth();
        return;
    }, [dataUpdate, setUserState])

    const stateChange = (selectedState) => {
        setState(selectedState);
        fetchCities(selectedState);
        setCity('');
    }

    const fetchCities = (state) => {
        if (citiesData.hasOwnProperty(state)) {
            setCities(citiesData[state]);
        }
        else {
            setCities([]);
        }
        setCity(city);
    }

    const EditButton = () => {
        fetchCities(State);
        setButtonState(false);
    }

    const DataVerify = () => {
        setFullName(FullName.trim());
        return (
            FullName.trim() !== fullname ||
            Mobile !== mobile ||
            BloodType !== bloodType ||
            State !== state ||
            City !== city
        );
    };

    const verifyUserDetails = async () => {
        const isDataChanged = DataVerify();
        if (!isDataChanged) {
            setNotification("Change userdetails to update");
        }
        const isCookieExist = GetCookie();

        if (isDataChanged && isCookieExist) {
            console.log("serr", UserLocation);
            try {
                setMiniLoader(true);
                const isUpdate = await axios.post(`${process.env.REACT_APP_API}/userdata/update`, {
                    fullname: FullName,
                    mobile: Mobile,
                    bloodtype: BloodType,
                    state: State,
                    city: City,
                    userCoordinates: UserLocation,
                    updatedTime
                }, {
                    headers: {
                        token: isCookieExist
                    },
                    // withCredentials: true,
                    // mode: 'cors',
                })

                if (isUpdate.data.message === 'updated') {
                    setDataUpdate(true);
                    setMiniLoader(false);
                    setNotification("UserDetails updated successfully, To donate blood all data are required");
                }
                else {
                    if (isUpdate.data.message === 'already exist') {
                        setMiniLoader(false);
                        setFullName(fullname);
                        setState(state);
                        setCity(city);
                        setBloodType(bloodType);
                        setMobile(mobile ?? '');
                        setNotification("You can't enter this Fullname or mobile");
                    }
                    else {
                        setNotification("problem while updating data");
                    }
                }
            } catch (error) {
                console.log("error while sending data update req to server");
            }
        }
        setButtonState(true);
        setTimeout(() => {
            setNotification('');
        }, 5000);
    }

    const verifyLocation = async (position,cookie) => {
        if (position.coords.longitude === cachedLocation[0] && position.coords.latitude === cachedLocation[1]) {
            return {data:{isLocationUpdated:true}};
        }
        else {
            const result = await axios.get(`${process.env.REACT_APP_API}/userdata/updatelocation`, {
                params : {
                    userCoordinates: [position.coords.longitude,position.coords.latitude],
                    updatedTime: position.timestamp
                },
                headers: {
                    token: cookie
                }
            })
            setCachedLocation([position.coords.longitude,position.coords.latitude]);
            return result;
        }

    }

    const updateLocation = () => {
        // await axios.get(`${process.env.REACT_APP_API}/userdata/updatelocation`);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const isCookieExist = GetCookie();
                    if (isCookieExist) {
                        setMiniLoader(true);
                        const result = await verifyLocation(position,isCookieExist);
                        if (result.data.isLocationUpdated) {
                            setNotification("Location updated successfully!");
                        }
                        else {
                            setNotification("Error while updating location");
                        }
                        setTimeout(() => {
                            setNotification('');
                        }, 3000);
                        setMiniLoader(false);
                    }
                }
            )
        }
    }

    if (loader) {
        return <Loader />;
    }
    else {
        if (isUserLogged) {
            return (
                <>
                    <Navbar />
                    <div className="Web-container">
                        <Herosection text='User Profile' />
                        {notification !== '' && <Notification text={notification} margintop={"3rem"} mobilemargintop={"1.5rem"} height={"50px"} />}
                        <div className="profile-container">
                            {miniLoader && <MiniLoader />}
                            <div className="profile-bar">
                                <Whitetext text="User Details"
                                    colour="white"
                                    textsize="1.75rem"
                                    textweight="700"
                                    class_name="userdetail-title" />
                                <div style={{ display: "flex", columnGap: "1rem" }}>
                                    <svg className="locationUpdateBtn" onClick={updateLocation} xmlns="http://www.w3.org/2000/svg" version="1.1" width="2.7rem" height="3rem" x="0" y="0" viewBox="0 0 1000 1000"><g><path d="M605.93 279.42A180 180 0 0 0 557 254.74a183.54 183.54 0 0 0-57-8.94 181.21 181.21 0 0 0-105.93 33.62c-77.35 55.14-97.91 161.33-48.3 242.33l72.24 118 63.91 104.36a21.2 21.2 0 0 0 36.16 0L582 639.71l72.24-118c49.6-80.96 29.04-187.15-48.31-242.29zM500 523.64a97.54 97.54 0 1 1 97.54-97.54A97.54 97.54 0 0 1 500 523.64zM177.88 324.51l8.4-63.87 8.39-63.87 51.12 39.2 51.11 39.21-59.51 24.67z" fill="#ff0000" opacity="1" data-original="#000000"></path><path d="M782.81 217.19a399.67 399.67 0 0 0-549-15.64l54.32 41.67a333 333 0 0 1 538.47 322 33.17 33.17 0 0 0 23 38.42l.82.24a33.07 33.07 0 0 0 41.8-25.18 399.92 399.92 0 0 0-109.41-361.51zM711.88 756.81a333 333 0 0 1-538.44-322 33.17 33.17 0 0 0-23-38.42l-.82-.24a33.07 33.07 0 0 0-41.8 25.18 399.91 399.91 0 0 0 658.44 377.1zM822.03 675.41l-59.49 24.73-59.49 24.73 51.16 39.16 51.17 39.15 8.33-63.89z" fill="#ff0000" opacity="1" data-original="#000000"></path></g></svg>
                                    {buttonState ?
                                        (<svg className="editbtn" onClick={EditButton} xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="3rem" viewBox="0 0 24 24"><g fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M9.533 11.15A1.823 1.823 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.822 1.822 0 0 0 0-2.577l-.751-.751a1.822 1.822 0 0 0-2.578 0z" /><path d="M21 12c0 4.243 0 6.364-1.318 7.682C18.364 21 16.242 21 12 21c-4.243 0-6.364 0-7.682-1.318C3 18.364 3 16.242 3 12c0-4.243 0-6.364 1.318-7.682C5.636 3 7.758 3 12 3" /></g></svg>) :
                                        (<svg className="savebtn" onClick={verifyUserDetails} xmlns="http://www.w3.org/2000/svg" width="2.5em" height="3em" viewBox="0 0 24 24"><g fill="none" stroke="red" strokeWidth="2"><path d="M16 21v-2c0-1.886 0-2.828-.586-3.414C14.828 15 13.886 15 12 15h-1c-1.886 0-2.828 0-3.414.586C7 16.172 7 17.114 7 19v2" /><path strokeLinecap="round" d="M7 8h5" /><path d="M3 9c0-2.828 0-4.243.879-5.121C4.757 3 6.172 3 9 3h7.172c.408 0 .613 0 .796.076c.184.076.329.22.618.51l2.828 2.828c.29.29.434.434.51.618c.076.183.076.388.076.796V15c0 2.828 0 4.243-.879 5.121C19.243 21 17.828 21 15 21H9c-2.828 0-4.243 0-5.121-.879C3 19.243 3 17.828 3 15z" /></g></svg>)
                                    }
                                </div>
                            </div>
                            <div className="profile-subcontainer">
                                <Whitetext text='Email'
                                    colour='red'
                                    textsize='1.5rem'
                                    textweight='400'
                                    class_name="subcontainer-text" />
                                <Whitetext text={email}
                                    colour='white'
                                    textsize='1.3rem'
                                    textweight='200'
                                    class_name="subcontainer-input-text" />
                            </div>
                            <div className="profile-subcontainer">
                                <Whitetext text='Full Name'
                                    colour='red'
                                    textsize='1.5rem'
                                    textweight='400'
                                    class_name="subcontainer-text" />
                                {
                                    buttonState ?
                                        (<Whitetext text={FullName}
                                            colour='white'
                                            textsize='1.3rem'
                                            textweight='200'
                                            class_name="subcontainer-input-text" />) :
                                        (
                                            <input name="fullname" placeholder="Enter Fullname" type="textarea" autoComplete="off" maxLength="25" value={FullName} onChange={(e) => { setFullName(e.target.value) }} />
                                        )
                                }
                            </div>
                            <div className="profile-subcontainer">
                                <Whitetext text='Mobile No'
                                    colour='red'
                                    textsize='1.5rem'
                                    textweight='400'
                                    class_name="subcontainer-text" />
                                {
                                    buttonState ?
                                        (<Whitetext text={Mobile}
                                            colour='white'
                                            textsize='1.3rem'
                                            textweight='200'
                                            class_name="subcontainer-input-text" />) :
                                        (

                                            <input name="mobilenumber" placeholder="Enter Mobile Number" type="number" onInput={(e) => e.target.value = e.target.value.slice(0, 10)} value={Mobile} onChange={(e) => setMobile(e.target.value.trim())} />
                                        )
                                }
                            </div>
                            <div className="profile-subcontainer">
                                <Whitetext text='Blood Type'
                                    colour='red'
                                    textsize='1.5rem'
                                    textweight='400'
                                    class_name="subcontainer-text" />
                                {
                                    buttonState ?
                                        (
                                            <Whitetext text={BloodType}
                                                colour='white'
                                                textsize='1.3rem'
                                                textweight='200'
                                                class_name="subcontainer-input-text" />) :
                                        (
                                            <select name="bloodtype" className="select-btn profile-select-btn" value={BloodType} onChange={(e) => { setBloodType(e.target.value) }}>
                                                <option value="">Select your blood type</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        )
                                }
                            </div>
                            <div className="profile-subcontainer">
                                <Whitetext text='State'
                                    colour='red'
                                    textsize='1.5rem'
                                    textweight='400'
                                    class_name="subcontainer-text" />
                                {
                                    buttonState ?
                                        (
                                            <Whitetext text={State}
                                                colour='white'
                                                textsize='1.3rem'
                                                textweight='200'
                                                class_name="subcontainer-input-text" />) :
                                        (
                                            <select name="state" className="select-btn profile-select-btn" value={State} onChange={(e) => { stateChange(e.target.value) }}>
                                                <option value="">Select your state</option>
                                                <option key="Gujarat" value="Gujarat">Gujarat</option>
                                                <option key="Maharashtra" value="Maharashtra">Maharashtra</option>
                                            </select>
                                        )
                                }
                            </div>
                            <div className="profile-subcontainer">
                                <Whitetext text='City'
                                    colour='red'
                                    textsize='1.5rem'
                                    textweight='400'
                                    class_name="subcontainer-text" />
                                {
                                    buttonState ?
                                        (
                                            <Whitetext text={City}
                                                colour='white'
                                                textsize='1.3rem'
                                                textweight='200'
                                                class_name="subcontainer-input-text" />) :
                                        (

                                            <select name="city" className="select-btn profile-select-btn" value={City} onChange={(e) => { setCity(e.target.value) }}>
                                                <option value="">Select your city</option>
                                                {cities.length > 0 &&
                                                    cities.map(city => (
                                                        <option key={city} value={city}>{city}</option>
                                                    ))
                                                }
                                            </select>

                                        )
                                }
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            )
        }
        else {
            return <Navigate to='/login' />;
        }
    };
};
