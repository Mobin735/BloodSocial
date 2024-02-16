import styled from "styled-components";

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5px;
`;

const BloodText = styled.p`
    color: white;
    letter-spacing: 1.2px;
    font-weight: 800;
    margin: 0;
`;

const SocialText = styled.p`
    color: red;
    letter-spacing: 1.2px;
    font-weight: 800;
    margin: 0;
`;
export default function Logo({font_size}) {
  return (
    <>
      <LogoContainer>
        <BloodText style={{fontSize:font_size}}>Blood</BloodText>
        <SocialText style={{fontSize:font_size}}>Social</SocialText>
      </LogoContainer>
    </>
  );
}
