import { useMemo } from "react"
import styled from "styled-components"

const Title = styled.p`
    margin: 0;
`

function WhitetextFunction({text,colour,textsize,textweight,margin_top,class_name}) {
    return(
        <>
            <Title className={class_name} style={{color:colour, fontSize:textsize, fontWeight:textweight, marginTop:margin_top}}>{text}</Title>
        </>
    )
};

const Whitetext = ({text,colour,textsize,textweight,margin_top,class_name}) => {
    return useMemo(()=> <WhitetextFunction text={text} colour={colour} textsize={textsize} textweight={textweight} margin_top={margin_top} class_name={class_name} />,[text])
}

export default Whitetext;
