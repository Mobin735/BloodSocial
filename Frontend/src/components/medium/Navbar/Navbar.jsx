import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../small/Logo';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../../context/user/UserContext';

function NavigationBar() {
    const { isUserLogged } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate("/login")
    }

    return (
        <Navbar expand="md" className="main-container" data-bs-theme="dark" fixed="top">
            {/* {console.log("navbar")} */}
            <Container fluid>
                <div className='navbar-brand'><Logo font_size="1.3rem" /></div>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2" style={{ maxHeight: 'auto' }}>
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/nearby" className="nav-link">Find Nearby</NavLink>
                        <NavLink to="/login" className="nav-link">Request</NavLink>
                        <NavLink to="/profile" className="nav-link">Profile</NavLink>
                    </Nav>
                    {
                        isUserLogged ? (
                            <div onClick={logout} style={{ textDecoration: 'none' }}>
                                <Button className='lg-btn' variant="danger" size='md'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1"
                                        width="25px"
                                        height="100%"
                                        x="0"
                                        y="0"
                                        viewBox="0 0 24 24"
                                    >
                                        <g>
                                            <g fill="#000">
                                                <path
                                                    d="M14.945 1.25c-1.367 0-2.47 0-3.337.117-.9.12-1.658.38-2.26.981-.524.525-.79 1.17-.929 1.928-.135.737-.161 1.638-.167 2.72a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457.105-.566.272-.895.515-1.138.277-.277.666-.457 1.4-.556.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103.734.099 1.122.28 1.4.556s.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.437-.103 3.192-.099.734-.279 1.122-.556 1.399s-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103-.733-.099-1.122-.28-1.399-.556-.243-.243-.41-.572-.515-1.138-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008c.006 1.082.032 1.983.167 2.72.14.758.405 1.403.93 1.928.601.602 1.36.86 2.26.982.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.117.9-.12 1.658-.38 2.26-.981.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337-.121-.9-.38-1.658-.982-2.26-.602-.602-1.36-.86-2.26-.981-.867-.117-1.97-.117-3.337-.117z"
                                                    fill="#ffffff"
                                                    opacity="1"
                                                    data-original="#000000"
                                                ></path>
                                                <path
                                                    d="M2.001 11.249a.75.75 0 0 0 0 1.5h11.973l-1.961 1.68a.75.75 0 1 0 .976 1.14l3.5-3a.75.75 0 0 0 0-1.14l-3.5-3a.75.75 0 0 0-.976 1.14l1.96 1.68z"
                                                    fill="#ffffff"
                                                    opacity="1"
                                                    data-original="#000000"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                    Logout</Button>
                            </div>
                        ) : (
                            <NavLink to='/login' style={{ textDecoration: 'none' }}>
                                <Button className='lg-btn' variant="danger" size='md'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1"
                                        width="25px"
                                        height="100%"
                                        x="0"
                                        y="0"
                                        viewBox="0 0 24 24"
                                    >
                                        <g>
                                            <g fill="#000">
                                                <path
                                                    d="M14.945 1.25c-1.367 0-2.47 0-3.337.117-.9.12-1.658.38-2.26.981-.524.525-.79 1.17-.929 1.928-.135.737-.161 1.638-.167 2.72a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457.105-.566.272-.895.515-1.138.277-.277.666-.457 1.4-.556.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103.734.099 1.122.28 1.4.556s.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.437-.103 3.192-.099.734-.279 1.122-.556 1.399s-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103-.733-.099-1.122-.28-1.399-.556-.243-.243-.41-.572-.515-1.138-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008c.006 1.082.032 1.983.167 2.72.14.758.405 1.403.93 1.928.601.602 1.36.86 2.26.982.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.117.9-.12 1.658-.38 2.26-.981.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337-.121-.9-.38-1.658-.982-2.26-.602-.602-1.36-.86-2.26-.981-.867-.117-1.97-.117-3.337-.117z"
                                                    fill="#ffffff"
                                                    opacity="1"
                                                    data-original="#000000"
                                                ></path>
                                                <path
                                                    d="M2.001 11.249a.75.75 0 0 0 0 1.5h11.973l-1.961 1.68a.75.75 0 1 0 .976 1.14l3.5-3a.75.75 0 0 0 0-1.14l-3.5-3a.75.75 0 0 0-.976 1.14l1.96 1.68z"
                                                    fill="#ffffff"
                                                    opacity="1"
                                                    data-original="#000000"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                    Login</Button>
                            </NavLink>

                        )
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const NavBar = () => {
    return useMemo(() => <NavigationBar />, []);
};

export default NavBar;