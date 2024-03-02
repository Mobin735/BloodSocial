import { useMemo } from 'react';
import Whitetext from '../../small/Whitetext';
import './Herosection.css';


function HerosectionFuction({text}) {
    return (
        <>
            <div className="general-section">
                <Whitetext text={text}
                    colour="white"
                    textsize="3rem"
                    textweight="700"
                    class_name="big-hero-text" />
            </div>
        </>
    )
};

const Herosection = ({ text }) => {
    return useMemo(() => <HerosectionFuction text={text} />, []);
};

export default Herosection;
