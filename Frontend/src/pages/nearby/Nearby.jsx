import { useContext, useEffect } from "react";
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

export default function Nearby() {
    const { donarSearches, nearByLoader, notification, isUserLogged, setUserState } = useContext(UserContext);

    useEffect(()=>{
        const isLogged = async () => {
            const result = await VerifyUser();
            if (result) {
                setUserState((prevstate)=>({
                    ...prevstate,
                    isUserLogged: true
                }))
            }
        }
        isLogged();
        return ;
    },[isUserLogged,setUserState])

    return (
        <>
            <NavBar />
            <div className="Web-container">
                <Herosection text='Find Donars and Blood Banks' />
                <div className="nearby-searchbar">
                    <Searchbar searchbar_id='homebar' />
                </div>
                {notification !== '' && <Notification text={notification} margintop={"3rem"} mobilemargintop={"1.5rem"} height={"50px"}/>}
                <div className="nearby-searches">
                    {nearByLoader && <MiniLoader />}
                    {
                        donarSearches.length > 0 ? 
                            donarSearches.map((donars)=>(
                                <div className="search-subcontainer" key={donars.Donarname.name}>
                                    <div className="search-innercontainer">
                                        <img src={require('../../assets/1img.jpg')} alt="" />
                                        <Whitetext
                                            text={donars.Donarname.name}
                                            colour="white"
                                            textsize="2rem"
                                            textweight="300"
                                        />
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" d="m5 12l-.604-5.437C4.223 5.007 5.825 3.864 7.24 4.535l11.944 5.658c1.525.722 1.525 2.892 0 3.614L7.24 19.466c-1.415.67-3.017-.472-2.844-2.028zm0 0h7"/></svg>
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
            </div>
            <Footer />
        </>
    )
};
