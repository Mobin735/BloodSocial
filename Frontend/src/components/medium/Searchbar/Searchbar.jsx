import { useContext, useState } from "react";
import Whitetext from "../../small/Whitetext";
import "./Searchbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/user/UserContext";

const citiesData = {
  Gujarat: ["Palanpur", "Surat", "Ahmedabad", "Patan"],
  Maharashtra: ["Mumbai", "Thane"]
}

export default function Searchbar({ searchbar_id }) {

  const [bloodtype, setBloodType] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [cities, setCities] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const { setNearByLoader, setDonarSearches, setNotification } = useContext(UserContext);

  const stateChange = (selectedState) => {
    setState(selectedState);
    fetchCities(selectedState);
  }

  const fetchCities = (selectedState) => {
    if (citiesData.hasOwnProperty(selectedState)) {
      setCities(citiesData[selectedState]);
    }
    else {
      setCities([]);
    }
    setCity('');
  }

  const submitSearch = async () => {
    if (bloodtype === '' || state === '' || city === '' || type === '') {
      return;
    }
    else {
      if (currentPath === '/') {
        navigate("/nearby")
      }
      setNearByLoader(true);
      setDonarSearches([]);
      const result = await axios.get(`${process.env.REACT_APP_API}/search/donars`, {
        params: { bloodtype, state, city }
      }); 
      console.log(result.data.donars);
      if (result.data.donars?.length > 0) {
        result.data.donars.map((user) => {
          return setDonarSearches((prevstates) => [
            ...prevstates,
            { name: user.name,
              bloodtype: user.bloodtype,
              coordinates: user.coordinates,
              updatedtime: user.updatedtime 
            }
          ])
        })
      }
      const donarsCount = result.data.donars?.length ?? 0;
      setNotification(`${donarsCount} donars found`);
      setTimeout(() => {
        setNotification('');
      }, 4500);
      setNearByLoader(false);
    }
  }

  return (
    <>
      <div className="search-bar" id={searchbar_id}>
        <div className="search-container">
          <Whitetext
            text="Blood Type"
            colour="white"
            textsize="1.25rem"
            textweight="400"
          />
          <select name="blood-type" className="select-btn" value={bloodtype} onChange={(e) => { setBloodType(e.target.value) }}>
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
        </div>
        <div className="search-container" value={state} onChange={(e) => { stateChange(e.target.value) }}>
          <Whitetext
            text="State"
            colour="white"
            textsize="1.25rem"
            textweight="400"
          />
          <select name="state" className="select-btn" value={state} onChange={(e) => { stateChange(e.target.value) }}>
            <option value="">Select your state</option>
            <option key="Gujarat" value="Gujarat">Gujarat</option>
            <option key="Maharashtra" value="Maharashtra">Maharashtra</option>
          </select>
        </div>
        <div className="search-container">
          <Whitetext
            text="City"
            colour="white"
            textsize="1.25rem"
            textweight="400"
          />
          <select name="city" className="select-btn" value={city} onChange={(e) => { setCity(e.target.value) }}>
            <option value=''>Select City</option>
            {
              cities.length > 0 &&
              cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))
            }
          </select>
        </div>
        <div className="search-container">
          <Whitetext
            text="Donar Info"
            colour="white"
            textsize="1.25rem"
            textweight="400"
          />
          <select name="donar-type" className="select-btn" value={type} onChange={(e) => { setType(e.target.value) }}>
            <option value="">Select Type</option>
            <option value="Donors">Donors</option>
          </select>
        </div>

        <button className="search-btn home" onClick={submitSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="1.85rem"
            height="1.85rem"
            x="0"
            y="0"
            viewBox="0 0 492.004 492.004"
          >
            <g>
              <path
                d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                fill="#ffffff"
                opacity="1"
                data-original="#000000"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </>
  );
}
