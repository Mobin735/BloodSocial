import Navbar from "../../components/medium/Navbar";
import Whitetext from "../../components/small/Whitetext";
import './Home.css';

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="Home-container">
                <div className="hero-section">
                    <Whitetext text="Find Life-Saving Donors"
                        colour="white"
                        textsize="3rem"
                        textweight="700" 
                        class_name="big-hero-text"/>
                    <Whitetext text="Connect with potential donors in real-time!"
                        colour="white"
                        textsize="2rem"
                        textweight="500" 
                        class_name="small-hero-text"/>
                </div>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sit doloribus fugit non sunt porro molestias itaque perspiciatis alias, fugiat vero, quas praesentium. Quisquam, est veniam. Iusto praesentium quae consequuntur?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sit doloribus fugit non sunt porro molestias itaque perspiciatis alias, fugiat vero, quas praesentium. Quisquam, est veniam. Iusto praesentium quae consequuntur?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sit doloribus fugit non sunt porro molestias itaque perspiciatis alias, fugiat vero, quas praesentium. Quisquam, est veniam. Iusto praesentium quae consequuntur?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sit doloribus fugit non sunt porro molestias itaque perspiciatis alias, fugiat vero, quas praesentium. Quisquam, est veniam. Iusto praesentium quae consequuntur?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sit doloribus fugit non sunt porro molestias itaque perspiciatis alias, fugiat vero, quas praesentium. Quisquam, est veniam. Iusto praesentium quae consequuntur?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sit doloribus fugit non sunt porro molestias itaque perspiciatis alias, fugiat vero, quas praesentium. Quisquam, est veniam. Iusto praesentium quae consequuntur?</h1>
            </div>
        </>
    )
};
