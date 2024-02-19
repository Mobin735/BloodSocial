import { NavLink } from "react-router-dom";
import Logo from "../../small/Logo";
import Whitetext from "../../small/Whitetext";
import './Footer.css';

export default function Footer(params) {
    return (
        <>
            <div className="footer-container">
                <div className="logo item">
                    <Logo font_size='3rem' />
                    <Whitetext class_name='footer-logo-text' text='Connecting donors and recipients' colour='white' textsize='1.4rem' textweight='300' />
                </div>
                <div className="name item">
                    <Whitetext text='Mobin@2024' colour='white' textsize='1rem' textweight='300' />
                </div>
                <div className="navigation item">
                    <Whitetext class_name='first-banner-text' text='Navigation' colour='white' textsize='1.5rem' textweight='600' />
                    <NavLink to="/login" className="nav-link">Home</NavLink>
                    <NavLink to="/login" className="nav-link">Find Nearby</NavLink>
                    <NavLink to="/login" className="nav-link">Request</NavLink>
                </div>
            </div>

        </>
    )
};
