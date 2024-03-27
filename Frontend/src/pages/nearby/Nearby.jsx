import { useContext, useEffect, useState } from "react";
import Footer from "../../components/medium/Footer/Footer";
import Herosection from "../../components/medium/Herosection/Herosection";
import NavBar from "../../components/medium/Navbar/Navbar";
import Searchbar from "../../components/medium/Searchbar/Searchbar";
import "./Nearby.css";
import { UserContext } from "../../context/user/UserContext";
import Whitetext from "../../components/small/Whitetext";
import MiniLoader from "../../components/small/MiniLoader";
import Notification from "../../components/small/Notification";
import VerifyUser from "../../utils/VerifyUser";

import "@maptiler/sdk/dist/maptiler-sdk.css";
import * as maptilersdk from '@maptiler/sdk';
import { useRef } from "react";
import axios from "axios";

// const UsersLocation = [
//     {
//         lon: 72.410100, 
//         lat: 24.168452, 
//         message: "mobin"
//     },
//     {
//         lon: 72.400058, 
//         lat: 24.162031, 
//         message: "John"
//     },
//     {
//         lon: 72.420657, 
//         lat: 24.170762, 
//         message: "Patrick"
//     },
// ]

export default function Nearby() {
    const { donarSearches, nearByLoader, setNotification, notification, setUserState } = useContext(UserContext);
    const [isLoggedInChecked, setIsLoggedInChecked] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const mapContainer = useRef(null);
    const map = useRef(null);
    maptilersdk.config.apiKey = process.env.REACT_APP_MAP_API_KEY;

    const isLogged = async () => {
        const result = await VerifyUser();
        setUserState(prevstate => ({ ...prevstate, isUserLogged: result }));
        setIsLoggedInChecked(result);
    }

    useEffect(() => {
        if (!isLoggedInChecked) { // Check if login verification is needed
            isLogged();
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => mapping(position),
                () => mapping(null)
            );
        } else {
            // Geolocation not supported by the browser
            mapping(null);
        }

    }, [isLoggedInChecked, setUserState, donarSearches])

    const mapping = async (position) => {
        // console.log("Mapppasasaas", donarSearches);

        const options = {
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
        };

        if (donarSearches.length <= 0) {
            if (position == null) {
                options.geolocate = maptilersdk.GeolocationType.POINT;
            } else {
                options.center = [position.coords.longitude, position.coords.latitude];
                options.zoom = 14.00;
            }
        }
        else {
            options.center = donarSearches[0].coordinates;
            options.zoom = 14.00;
        }

        map.current = new maptilersdk.Map(options);

        if (donarSearches.length <= 0 && position != null) {

            const nearbyUsers = await axios.get(`${process.env.REACT_APP_API}/search/nearbyusers`, {
                params: {
                    lon: position.coords.longitude,
                    lat: position.coords.latitude
                }
            })

            nearbyUsers.data.users.map((user) => {
                const time = new Date(user.updatedtime).toLocaleString("en-IN");
                var popup = new maptilersdk.Popup({ offset: 25, html: true }).setHTML(
                    `<h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Name: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.name}</span></h1>
                    <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Bloodtype: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.bloodtype}</span></h1>
                    <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Last Updated: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${time}</span></h1>`
                );

                new maptilersdk.Marker({ color: "red" })
                    .setLngLat([user.coordinates[0], user.coordinates[1]])
                    .setPopup(popup)
                    .addTo(map.current);
            })
        }
        else {
            donarSearches.map((user) => {
                const time = new Date(user.updatedtime).toLocaleString("en-IN");
                var popup = new maptilersdk.Popup({ offset: 25, html: true }).setHTML(
                    `<h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Name: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.name}</span></h1>
                    <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Bloodtype: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.bloodtype}</span></h1>
                    <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Last Updated: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${time}</span></h1>`
                );

                new maptilersdk.Marker({ color: "red" })
                    .setLngLat([user.coordinates[0], user.coordinates[1]])
                    .setPopup(popup)
                    .addTo(map.current);
            })
        }
    }

    const requestBlood = async () => {
        if (donarSearches.length <= 0) {
            setNotification("Search for donors to send them requests for blood");
        }
        else {
            const isUserValid = await VerifyUser();
            if (!isUserValid) {
                setNotification("User must be logged-in to send a request");
            }
            else {
                console.log(selectedUsers);
            }
        }
        setTimeout(() => {
            setNotification('');
        }, 4000);
        return;
    }

    const checkboxArray = (e,userName) => {
        if (e.target.checked) {
            // console.log(userName);
            setSelectedUsers([...selectedUsers,userName]);
        }
        else {
            setSelectedUsers(selectedUsers.filter(user => user !== userName));
        }
    }

    return (
        <>
            <NavBar />
            <div className="Web-container">
                <Herosection text='Find Donars and Blood Banks' />
                <div className="nearby-searchbar">
                    <Searchbar searchbar_id='homebar' />
                </div>
                {notification !== '' && <Notification text={notification} margintop={"3rem"} mobilemargintop={"1.5rem"} height={"50px"} />}
                <div className="buttonContainer">
                    {/* <div className="locationBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30px" height="30px" x="0" y="0" viewBox="0 0 368.16 368.16"><g><path d="M184.08 0c-74.992 0-136 61.008-136 136 0 24.688 11.072 51.24 11.536 52.36 3.576 8.488 10.632 21.672 15.72 29.4l93.248 141.288c3.816 5.792 9.464 9.112 15.496 9.112s11.68-3.32 15.496-9.104l93.256-141.296c5.096-7.728 12.144-20.912 15.72-29.4.464-1.112 11.528-27.664 11.528-52.36 0-74.992-61.008-136-136-136zM293.8 182.152c-3.192 7.608-9.76 19.872-14.328 26.8l-93.256 141.296c-1.84 2.792-2.424 2.792-4.264 0L88.696 208.952c-4.568-6.928-11.136-19.2-14.328-26.808-.136-.328-10.288-24.768-10.288-46.144 0-66.168 53.832-120 120-120s120 53.832 120 120c0 21.408-10.176 45.912-10.28 46.152z" fill="#ff0000" opacity="1" data-original="#000000"></path><path d="M184.08 64.008c-39.704 0-72 32.304-72 72s32.296 72 72 72 72-32.304 72-72-32.296-72-72-72zm0 128c-30.872 0-56-25.12-56-56s25.128-56 56-56 56 25.12 56 56-25.128 56-56 56z" fill="#ff0000" opacity="1" data-original="#000000"></path></g></svg>
                        <Whitetext
                            text="Request Location"
                            colour="white"
                            textsize="1.4rem"
                            textweight="300"
                        />
                    </div> */}
                    <div className="requestBlood" onClick={requestBlood}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30px" height="30px" x="0" y="0" viewBox="0 0 64 64"><g><path d="M48.54 31.637C32.799 4.385 56.183 44.873 32.866 4.5c-.357-.619-1.375-.619-1.732 0L15.386 31.764A19.045 19.045 0 0 0 13 41c0 10.477 8.523 19 19 19s19-8.523 19-19c0-3.592-1.104-7.151-2.46-9.363zM32 58c-9.374 0-17-7.626-17-17 0-3.032.932-6.192 2.267-8.488L32 7c15.366 26.603 14.725 25.513 14.801 25.615l-.004.003C46.838 32.718 49 36.171 49 41c0 9.374-7.626 17-17 17z" fill="#ff0000" opacity="1" data-original="#000000"></path><path d="M32 52c-6.065 0-11-4.935-11-11a1 1 0 0 0-2 0c0 7.168 5.832 13 13 13a1 1 0 0 0 0-2z" fill="#ff0000" opacity="1" data-original="#000000"></path></g></svg>
                        <Whitetext
                            text="Request Blood"
                            colour="white"
                            textsize="1.4rem"
                            textweight="300"
                        />
                    </div>
                    <div className="requestBtn">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30px" height="30px" x="0" y="0" viewBox="0 0 24 24"><g><g fill="#000"><path d="M12.75 11a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0z" fill="#ff0000" opacity="1" data-original="#000000" class=""></path><path fill-rule="evenodd" d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75 22.75 17.937 22.75 12 17.937 1.25 12 1.25zM2.75 12a9.25 9.25 0 1 1 18.5 0 9.25 9.25 0 0 1-18.5 0z" clip-rule="evenodd" fill="#ff0000" opacity="1" data-original="#000000"></path><path d="M13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="#ff0000" opacity="1" data-original="#000000"></path></g></g></svg> */}
                        <Whitetext
                            text="By sending a blood request to donars, your phone number also gets sent with the request, and if the donar accepts your request, you get the donar information back."
                            colour="white"
                            textsize="1.2rem"
                            textweight="300"
                        />
                    </div>
                </div>
                <div className="nearby-searches">
                    {nearByLoader && <MiniLoader />}
                    {
                        donarSearches.length > 0 ?
                            donarSearches.map((donars) => (
                                <div className="search-subcontainer" key={donars.name}>
                                    <div className="search-innercontainer">
                                        <img src={require('../../assets/1img.jpg')} alt="" />
                                        <Whitetext
                                            text={donars.name}
                                            colour="white"
                                            textsize="2rem"
                                            textweight="300"
                                        />
                                    </div>
                                    <input onChange={(e)=>checkboxArray(e,donars.name)} className="requestCheckbox" type="checkbox" />
                                </div>
                            )) : (
                                <Whitetext
                                    text="No Donars Available"
                                    colour="white"
                                    textsize="2rem"
                                    textweight="300"
                                    class_name="notfound"
                                />
                            )
                    }
                </div>
                <div className="map-wrap">
                    <div ref={mapContainer} className="map" />
                </div>
            </div>
            <Footer />
        </>
    )
};

