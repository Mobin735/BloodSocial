import { useState } from "react";
import Whitetext from "../../small/Whitetext";
import "./Searchbar.css";

export default function Searchbar({searchbar_id}) {
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
          <select className="select-btn">
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
        <div className="search-container">
          <Whitetext
            text="State"
            colour="white"
            textsize="1.25rem"
            textweight="400"
          />
          <select className="select-btn">
            <option value="">Select State</option>
            <option value="gujarat">Gujarat</option>
          </select>
        </div>
        <div className="search-container">
          <Whitetext
            text="City"
            colour="white"
            textsize="1.25rem"
            textweight="400"
          />
          <select className="select-btn">
            <option value="">Select City</option>
            <option value="ahmedabar">Ahmedabad</option>
            <option value="surat">Surat</option>
            <option value="vadodara">Vadodara</option>
          </select>
        </div>
        <div className="search-container">
          <Whitetext
            text="Donar Info"
            colour="white"
            textsize="1.25rem"
            textweight="400"
          />
          <select className="select-btn">
            <option value="">Select Type</option>
            <option value="Donors">Donors</option>
            <option value="Bloodblank">Bloodblank</option>
          </select>
        </div>

        <button className="search-btn">
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
