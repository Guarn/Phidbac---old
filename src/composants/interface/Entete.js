import React from "react";
import styled from "styled-components";
import Logo from "../svg/Logo.png";
import Bg from "../svg/Capture.jpg";
import { Breakpoint } from "react-socks";

const ConteneurEntete = styled.div`
    display: flex;
    flex-direction: row;
    height: 185px;
    background-image: ${`url(${Bg})`};
    background-size: 100%;
`;

const ConteneurEnteteSmall = styled.div`
    display: flex;
    flex-direction: row;
    height: 100px;
    background-image: ${`url(${Bg})`};
    background-size: 100%;
`;

const LogosSmall = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Logos = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ConteneurTitres = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    color: white;
    font-family: "Century Gothic";
    justify-content: center;
    align-items: center;
    margin-top: -15px;
`;
const ConteneurTitresSmall = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    color: white;
    font-family: "Century Gothic";
    justify-content: center;
    align-items: center;
    margin-top: -15px;
`;

const Texte = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: "Century Gothic";
`;
const TexteSmall = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: "Century Gothic";
`;

const TitrePrincipal = styled.div`
    font-size: 4.6em;
`;
const TitrePrincipalSmall = styled.div`
    font-size: 2em;
`;
const TitreSecondaire = styled.div`
    font-size: 1.8em;
    z-index: 50;
`;
const TitreSecondaireSmall = styled.div`
    font-size: 1.2em;
    z-index: 50;
`;

const ColOrange = styled.span`
    color: #ff9900;
`;

const Entete = () => {
    return (
        <div>
            <Breakpoint medium up>
                <ConteneurEntete>
                    <Logos>
                        <img src={Logo} alt="a" height="119" width="119" />
                    </Logos>
                    <ConteneurTitres>
                        <TitrePrincipal>
                            <ColOrange>φ</ColOrange>d<ColOrange>'</ColOrange>bac
                            <ColOrange>'</ColOrange>!
                        </TitrePrincipal>
                        <TitreSecondaire>
                            la <strong>phi</strong>losophie <strong>d</strong>u{" "}
                            <strong>bac</strong>
                        </TitreSecondaire>
                        <div
                            style={{
                                height: "3px",
                                backgroundColor: "#ff9900",
                                width: "300px",
                                marginTop: "-4px",
                                zIndex: "1"
                            }}
                        />
                    </ConteneurTitres>
                    <Texte>
                        <div
                            style={{
                                fontSize: "3em",
                                color: "#ff9900",
                                marginBottom: "-12px"
                            }}
                        >
                            tout
                        </div>
                        <div>
                            <div style={{ fontSize: "0.8em" }}>
                                pour préparer
                            </div>
                            <div style={{ fontSize: "0.8em" }}>la philo du</div>
                            <div style={{ fontSize: "0.8em" }}>
                                baccalauréat
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: "2.8em",
                                color: "#ff9900",
                                marginTop: "-12px"
                            }}
                        >
                            2021
                        </div>
                    </Texte>
                </ConteneurEntete>
            </Breakpoint>
            <Breakpoint medium down>
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
            </Breakpoint>
        </div>
    );
};

export default Entete;
