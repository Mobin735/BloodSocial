import styled from "styled-components";
import Whitetext from "./Whitetext";

const InfoContainer = styled.div`
  padding-top: 3rem;

  .info-title {
    padding-bottom: 1rem;
  }

  @media (max-width: 786px) {
    padding-top: 2rem !important;
    .info-title {
      font-size: 1.5rem !important;
    }
  }
`;
const SubContainer = styled.div`
  display: flex;
  height: fit-content;
  column-gap: 2rem;

  @media (max-width: 786px) {
    row-gap: 1rem;
    flex-direction: column-reverse;

    .info-des {
      font-size: 4vw !important;
    }
  }
`;
const ImgContainer = styled.div`
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  align-self: center;
  justify-self: end;
  height: 25vw;
  width: 260vw;

  @media (max-width: 786px) {
    height: 50vw !important;
    width: 100% !important;
  }
`;

export default function Info({ class_name, imgpath, title_text, des_text }) {
  return (
    <>
      <InfoContainer className={class_name}>
        <Whitetext
          text={title_text}
          colour="white"
          textsize="1.75rem"
          textweight="600"
          class_name="info-title"
        />
        <SubContainer>
          <Whitetext
            text={des_text}
            colour="white"
            textsize="2vw"
            textweight="300"
            class_name="info-des"
          />
          <ImgContainer img={imgpath} />
        </SubContainer>
      </InfoContainer>
    </>
  );
}
