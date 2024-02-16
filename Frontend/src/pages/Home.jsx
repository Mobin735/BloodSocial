import { NavLink } from "react-router-dom"

export default function Home() {
    return (
        <>
            <h1>This is Home Page</h1>
            <NavLink to="/login">Normal Login Page</NavLink>
        </>
    )
};
