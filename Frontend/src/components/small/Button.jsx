import styled from "styled-components"

const Buttoncmp = styled.button`
    border-radius: 10px;
    padding: 0.5rem;
    color: white;
    border: none;
    font-weight: 700;
`



export default function Button({text,text_size,bg_color}) {
    return (
        <>
            <Buttoncmp style={{backgroundColor:bg_color,fontSize:text_size}}>{text}</Buttoncmp>
        </>
    )
};
