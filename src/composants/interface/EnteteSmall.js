import React from "react";
import styled from "styled-components";
import Logo from "../svg/Logo.png";
import Bg from "../svg/Capture.jpg";

const ConteneurEnteteSmall = styled.div`
    display: flex;
    flex-direction: row;
    height: 100px;
    background-image: ${`url(${Bg})`};
`;

const LogosSmall = styled.div`
    margin-left:10px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ConteneurTitresSmall = styled.div`
    flex: 10;
    display: flex;
    flex-direction: column;
    color: white;
    font-family: "Century Gothic";
    justify-content: center;
    align-items: center;
    margin-top: -15px;
`;
const TitrePrincipalSmall = styled.div`
    font-size: 3em;
`;

const TitreSecondaireSmall = styled.div`
    font-size: 1.2em;
    z-index: 50;
`;

const ColOrange = styled.span`
    color: #ff9900;
`;

const EnteteSmall = () => {
    return (
        <ConteneurEnteteSmall>
            <LogosSmall>
                <img src={Logo} alt="a" height="60" width="60" />
            </LogosSmall>
            <ConteneurTitresSmall>
                <TitrePrincipalSmall>
                    <ColOrange>φ</ColOrange>d<ColOrange>'</ColOrange>bac
                    <ColOrange>'</ColOrange>!
                </TitrePrincipalSmall>
                <TitreSecondaireSmall>
                    la <strong>phi</strong>losophie <strong>d</strong>u{" "}
                    <strong>bac</strong>
                </TitreSecondaireSmall>
            </ConteneurTitresSmall>
        </ConteneurEnteteSmall>
    );
};

export default EnteteSmall;
