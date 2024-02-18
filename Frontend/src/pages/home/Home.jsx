import Navbar from "../../components/medium/Navbar/Navbar";
import Searchbar from "../../components/medium/Searchbar/Searchbar";
import Button from "../../components/small/Button";
import Info from "../../components/small/Info";
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
                        class_name="big-hero-text" />
                    <Whitetext text="Connect with potential donors in real-time! and save lives"
                        colour="white"
                        textsize="2rem"
                        textweight="500"
                        class_name="small-hero-text" />
                    <div className="hero-section-mobile-btn">
                        <Button text='Register Now' text_size='1rem' bg_color='red' />
                        <Button text='Search Donor' text_size='1rem' bg_color='#2F2F2F' />
                    </div>
                </div>
                <div className="home-searchbar">
                    <Searchbar searchbar_id='homebar' />
                </div>
                <div className="home-features">
                    <Whitetext class_name='feature-title' text='What we offer!' colour='white' textsize='28px' textweight='600' />
                    <div className="features">
                        <div className="feature_1">
                            <Whitetext text='Nearby Donors' colour='white' textsize='1.5rem' textweight='400' />
                        </div>
                        <div className="feature_2">
                            <Whitetext text='Nearby Bloodbanks' colour='white' textsize='1.5rem' textweight='400' />
                        </div>
                        <div className="feature_3">
                            <Whitetext text='Request Blood' colour='white' textsize='1.5rem' textweight='400' />
                        </div>
                        <div className="feature_4">
                            <Whitetext text='Chat with donor' colour='white' textsize='1.5rem' textweight='400' />
                        </div>
                    </div>
                </div>
                <Info class_name='first_info' imgpath={require('../../assets/1img.jpg')} title_text="Why Donate Blood?" des_text='Donating blood is a crucial and selfless act that directly saves lives and supports community health. Blood donations are essential for various medical treatments, emergencies, and disaster response. With no substitute for human blood, this simple gesture not only benefits recipients but also contributes to ongoing medical research. The act fosters a sense of community and solidarity, showcasing compassion and altruism.'/>
                <Info class_name='second_info' imgpath={require('../../assets/3img.jpg')} title_text="Benefits Of Donating Blood" des_text='Donating blood provides a multitude of benefits, contributing significantly to individual and community well-being. Beyond its immediate impact on saving lives and supporting emergency responses, regular blood donation promotes community health resilience. Additionally, it plays a crucial role in advancing medical research, driving progress in healthcare.'/>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea doloribus distinctio consectetur ex ullam veritatis eaque magni quaerat labore id rerum accusantium amet, laborum, reprehenderit illo harum alias architecto velit?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea doloribus distinctio consectetur ex ullam veritatis eaque magni quaerat labore id rerum accusantium amet, laborum, reprehenderit illo harum alias architecto velit?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea doloribus distinctio consectetur ex ullam veritatis eaque magni quaerat labore id rerum accusantium amet, laborum, reprehenderit illo harum alias architecto velit?</h1>
            </div>
        </>
    )
};
