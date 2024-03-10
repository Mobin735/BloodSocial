import styled from "styled-components";
import Logo from "../components/small/Logo";

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -4.5rem !important;
  row-gap: 2rem;
  flex-direction: column;
`;

const LoaderDiv = styled.div`
  width: 60px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #ff0000 94%, #0000),
    radial-gradient(farthest-side, #ffffff 94%, #0000),
    radial-gradient(farthest-side, #ff0000 94%, #0000),
    radial-gradient(farthest-side, #ffffff 94%, #0000), #ff0000;
  background-size: 105% 105%;
  background-repeat: no-repeat;
  animation: l5 2s infinite;

  @keyframes l5 {
    0% {
      background-position: 50% -70px, -70px 50%, 50% calc(100% + 70px),
        calc(100% + 70px) 50%;
    }
    20%,
    25% {
      background-position: 50% -70px, -70px 50%, 50% calc(100% + 70px), 50% 50%;
    }
    45%,
    50% {
      background-position: 50% -70px, -70px 50%, 50% 50%, 50% 50%;
    }
    75%,
    75% {
      background-position: 50% -70px, 50% 50%, 50% 50%, 50% 50%;
    }
    95%,
    100% {
      background-position: 50% 50%, 50% 50%, 50% 50%, 50% 50%;
    }
  }
`;

export default function Loader(params) {
  return (
    <>
      <LoaderContainer>
        <LoaderDiv className="loader" />
        <Logo
          font_size="2rem"
          style={{ width: "fit-content", margin_top: "-3vh" }}
        />
      </LoaderContainer>
    </>
  );
}
