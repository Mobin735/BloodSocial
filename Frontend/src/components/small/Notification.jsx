import styled from "styled-components";
import Whitetext from "./Whitetext";

const NotificationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${(props) => props.margintop};

  @media (max-width: 786px) {
    margin-top: ${(props) => props.mobilemargintop};
  }
`;

const NotificationRectangle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 50px;
  height: ${(props) => props.height};
  background: red;
  transform: scale(0);
  border-radius: 50px;
  color: white;
  opacity: 0;
  overflow: hidden;
  animation: scale-in 0.3s ease-out forwards, expand 0.2s 0.3s ease-out forwards;

  @keyframes scale-in {
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes expand {
    25% {
      width: 25%;
    }
    50% {
      width: 50%;
      /* border-radius: 6px; */
    }
    75% {
      width: 75%;
      /* border-radius: 6px; */
    }
    100% {
      width: 100%;
      /* height: 100%; */
    }
  }
`;
const NotificationText = styled.div`
  display: flex;
  align-items: center;
  /* padding: 0 16px; */
  animation: fade-in 0.8s ease-in forwards;
  /* column-gap: 16px; */
  width: 100%;

  p {
    width: 80%;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.75;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 786px) {
    svg {
      width: 50% !important;
      height: 50% !important;
    }
    p {
      font-size: 15px !important;
    }
  }
`;

export default function Notification({ text, margintop, mobilemargintop, height }) {
  return (
    <NotificationContainer
      margintop={margintop}
      mobilemargintop={mobilemargintop}
    >
      <NotificationRectangle height={height}>
        <NotificationText>
          <div className="icon" style={{ width: "60px", textAlign: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="30px"
              height="30px"
              x="0"
              y="0"
              viewBox="0 0 512 512"
            >
              <g>
                <path
                  d="M256 0C114.509 0 0 114.496 0 256c0 141.489 114.496 256 256 256 141.491 0 256-114.496 256-256C512 114.511 397.504 0 256 0zm26.289 357.621c0 8.088-11.794 16.174-26.284 16.174-15.164 0-25.946-8.086-25.946-16.174V229.234c0-9.435 10.783-15.839 25.946-15.839 14.49 0 26.284 6.404 26.284 15.839v128.387zm-26.283-175.225c-15.501 0-27.631-11.457-27.631-24.263 0-12.805 12.131-23.925 27.631-23.925 15.164 0 27.296 11.12 27.296 23.925 0 12.806-12.133 24.263-27.296 24.263z"
                  fill="#ffffff"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </div>
          <Whitetext
            text={text}
            colour="white"
            textsize="17px"
            textweight="500"
          />
        </NotificationText>
      </NotificationRectangle>
    </NotificationContainer>
  );
}
