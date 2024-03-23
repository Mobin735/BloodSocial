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
    const { donarSearches, nearByLoader, notification, setUserState } = useContext(UserContext);
    const [isLoggedInChecked, setIsLoggedInChecked] = useState(false);
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
        console.log("Mapppasasaas", donarSearches);

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

        const users = donarSearches.length <= 0 && position != null ?
            (await axios.get(`${process.env.REACT_APP_API}/search/nearbyusers`, { params: { lon: position.coords.longitude, lat: position.coords.latitude } })).data.users :
            donarSearches;

        users.map((user) => {
            const time = new Date(user.updatedtime).toLocaleString("en-IN");
            const popupContent = `<h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Name: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.name}</span></h1>
                                     <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Bloodtype: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.bloodtype}</span></h1>
                                     <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Last Updated: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${time}</span></h1>`;
            const popup = new maptilersdk.Popup({ offset: 25, html: true }).setHTML(popupContent);
            new maptilersdk.Marker({ color: "red" }).setLngLat(user.coordinates).setPopup(popup).addTo(map.current);
        });


        // if (donarSearches.length <= 0 && position != null) {

        //     const nearbyUsers = await axios.get(`${process.env.REACT_APP_API}/search/nearbyusers`, {
        //         params: {
        //             lon: position.coords.longitude,
        //             lat: position.coords.latitude
        //         }
        //     })

        //     nearbyUsers.data.users.map((user) => {
        //         const time = new Date(user.updatedtime).toLocaleString("en-IN");
        //         var popup = new maptilersdk.Popup({ offset: 25, html: true }).setHTML(
        //             `<h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Name: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.name}</span></h1>
        //             <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Bloodtype: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.bloodtype}</span></h1>
        //             <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Last Updated: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${time}</span></h1>`
        //         );

        //         new maptilersdk.Marker({ color: "red" })
        //             .setLngLat([user.coordinates[0], user.coordinates[1]])
        //             .setPopup(popup)
        //             .addTo(map.current);
        //     })
        // }
        // else {
        //     donarSearches.map((user) => {
        //         const time = new Date(user.updatedtime).toLocaleString("en-IN");
        //         var popup = new maptilersdk.Popup({ offset: 25, html: true }).setHTML(
        //             `<h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Name: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.name}</span></h1>
        //             <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Bloodtype: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${user.bloodtype}</span></h1>
        //             <h1 style="color: #ff0000; font-size: 16px; font-weight: 700; white-space: nowrap;">Last Updated: <span style="color: #000000; font-size: 16px; font-weight: 500; font-family: inherit;">${time}</span></h1>`
        //         );

        //         new maptilersdk.Marker({ color: "red" })
        //             .setLngLat([user.coordinates[0], user.coordinates[1]])
        //             .setPopup(popup)
        //             .addTo(map.current);
        //     })
        // }
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" d="m5 12l-.604-5.437C4.223 5.007 5.825 3.864 7.24 4.535l11.944 5.658c1.525.722 1.525 2.892 0 3.614L7.24 19.466c-1.415.67-3.017-.472-2.844-2.028zm0 0h7" /></svg>
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

