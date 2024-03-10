import { NavLink } from "react-router-dom";
import Logo from "../../small/Logo";
import Whitetext from "../../small/Whitetext";
import './Footer.css';
import { useMemo } from "react";

function FooterFunction() {
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
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/nearby" className="nav-link">Find Nearby</NavLink>
                    <NavLink to="/login" className="nav-link">Request</NavLink>
                    <NavLink to="/profile" className="nav-link">Profile</NavLink>
                </div>
            </div>

        </>
    )
};

const Footer = () => {
    return useMemo(() => <FooterFunction />, []);
};

export default Footer;
