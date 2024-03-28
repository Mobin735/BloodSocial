import styled from "styled-components"

const NotificationHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
`
const NotificationBody = styled.div`
    margin-top: 10px;
    text-align: center;
`
const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    object-fit: contain;  
`

export default function Message({ notification }) {
    return (
        <>
            <NotificationHeader id="notificationHeader">
                {/* image is optional */}
                {notification.image && (
                    <ImageContainer id="imageContainer">
                        <img src={notification.image} width={100} />
                    </ImageContainer>
                )}
                <span>{notification.title}</span>
            </NotificationHeader>
            <NotificationBody id="notificationBody">{notification.body}</NotificationBody>
        </>
    )
};
