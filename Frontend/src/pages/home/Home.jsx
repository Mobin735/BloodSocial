import Footer from "../../components/medium/Footer/Footer";
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
                            <Whitetext text='Realtime Tracking' colour='white' textsize='1.5rem' textweight='400' />
                        </div>
                    </div>
                </div>
                <Info class_name='first_info' imgpath={require('../../assets/1img.jpg')} title_text="Why Donate Blood?" des_text='Donating blood is a crucial and selfless act that directly saves lives and supports community health. Blood donations are essential for various medical treatments, emergencies, and disaster response. With no substitute for human blood, this simple gesture not only benefits recipients but also contributes to ongoing medical research. The act fosters a sense of community and solidarity, showcasing compassion and altruism.' />
                <Info class_name='second_info' imgpath={require('../../assets/3img.jpg')} title_text="Benefits Of Donating Blood" des_text='Donating blood provides a multitude of benefits, contributing significantly to individual and community well-being. Beyond its immediate impact on saving lives and supporting emergency responses, regular blood donation promotes community health resilience. Additionally, it plays a crucial role in advancing medical research, driving progress in healthcare.' />
                <div className="home-bottom-banner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 14 14"><path fill="red" fill-rule="evenodd" d="m7 .464l.377-.27a.464.464 0 0 0-.754 0zm0 0l-.377-.27l-.002.002l-.005.006L6.6.226a15.595 15.595 0 0 0-.276.4a23.46 23.46 0 0 0-.652 1.027a12.4 12.4 0 0 0-.664 1.25c-.176.395-.33.831-.33 1.198c0 .631.24 1.24.673 1.691c.434.452 1.027.71 1.649.71c.622 0 1.215-.258 1.649-.71c.433-.451.673-1.06.673-1.69c0-.368-.154-.804-.33-1.2a12.408 12.408 0 0 0-.664-1.25A23.088 23.088 0 0 0 7.4.227L7.384.202L7.379.196L7.378.195L7 .465ZM0 5.112v4.726a2 2 0 0 0 .586 1.414l2.191 2.191V14H6.11v-2.874a2.22 2.22 0 0 0-.65-1.57L4.022 8.118l-.004-.004a.8.8 0 0 0-1.076 1.182l.92.92a.5.5 0 1 1-.707.707l-.92-.92a1.8 1.8 0 0 1-.014-2.53V5.111a1.11 1.11 0 1 0-2.222 0Zm14 4.726V5.112a1.11 1.11 0 0 0-2.222 0v2.361a1.8 1.8 0 0 1-.014 2.532l-.92.919a.5.5 0 0 1-.707-.707l.92-.92A.8.8 0 0 0 9.98 8.115l-.004.004L8.54 9.555a2.22 2.22 0 0 0-.65 1.571V14h3.332v-.556l2.191-2.192A2 2 0 0 0 14 9.838" clip-rule="evenodd" /></svg>
                    <div className="banner-text">
                        <Whitetext class_name='first-banner-text' text='Donate and save lives!' colour='white' textsize='1.688rem' textweight='600' />
                        <Whitetext class_name='second-banner-text' text='Sign up to find blood donors near you and receive updates on new blood request' colour='white' textsize='1.188rem' textweight='300' />
                    </div>
                    <Button text='Sign up' text_size='1.55vw' bg_color='black' />
                </div>
            </div>
            <Footer />
        </>
    )
};
