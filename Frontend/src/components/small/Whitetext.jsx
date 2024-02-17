import styled from "styled-components"

const Title = styled.p`
    margin: 0;
`

export default function Whitetext({text,colour,textsize,textweight,margin_top,class_name}) {
    return(
        <>
            <Title className={class_name} style={{color:colour, fontSize:textsize, fontWeight:textweight, marginTop:margin_top}}>{text}</Title>
        </>
    )
};
