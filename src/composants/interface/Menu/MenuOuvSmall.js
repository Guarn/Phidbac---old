import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";

const Conteneur = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: #ff9900;
    z-index: 103;
    display: flex;
    flex-direction: column;
    padding-top: 80px;
`;

const BtnMenu = styled.div`
    font-family: "Century Gothic";
    color: white;
    font-size: 1.3em;
    user-select: none;
    font-weight: ${(props) => (props.Validation ? "bold" : "normal")};
`;

const Fermeture = styled.svg`
    position: absolute;
    top: 0;
    right: 0;
    height: 40px;
    width: 40px;
    margin: 20px;
`;

const ConteneurBtn = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`;

const Validation = styled.div`
    background-color: ${(props) => (props.actif ? "black" : "none")};
    width: 9px;
    margin-left: 15px;
    margin-right: 15px;
`;

const MenuOuvSmall = (props) => {
    const [red, setRed] = useState(false);
    const [page, setPage] = useState("");
    console.log(props);
    let han = async (UrlPage) => {
        await setPage(UrlPage);
        await setRed(true);
        await props.activation();
    };

    return (
        <Conteneur id="Menu">
            <div>
                <Fermeture
                    viewBox="0 0 32 32"
                    onClick={() => props.activation()}
                >
                    <g>
                        <line
                            x1="1.12"
                            y1="1.12"
                            x2="22.88"
                            y2="22.88"
                            style={{
                                fill: "none",
                                stroke: "#707070",
                                strokeLinecap: "round",
                                strokeWidth: "2px"
                            }}
                        />
                        <line
                            x1="22.88"
                            y1="1.12"
                            x2="1.12"
                            y2="22.88"
                            style={{
                                fill: "none",
                                stroke: "#707070",
                                strokeLinecap: "round",
                                strokeWidth: "2px"
                            }}
                        />
                    </g>
                </Fermeture>
            </div>

            {red && <Redirect push to={page} />}
            <ConteneurBtn>
                <Validation
                    actif={props.location.pathname === "/" ? true : false}
                />
                <BtnMenu
                    Validation={props.location.pathname === "/" ? true : false}
                    onClick={() => han("/")}
                >
                    Accueil
                </BtnMenu>
            </ConteneurBtn>
            <ConteneurBtn>
                <Validation
                    actif={
                        props.location.pathname === "/Programme" ? true : false
                    }
                />
                <BtnMenu
                    Validation={
                        props.location.pathname === "/Programme" ? true : false
                    }
                >
                    Programme / épreuves
                </BtnMenu>
            </ConteneurBtn>
            <ConteneurBtn>
                <Validation
                    actif={props.location.pathname === "/Cours" ? true : false}
                />
                <BtnMenu
                    Validation={
                        props.location.pathname === "/Cours" ? true : false
                    }
                    onClick={() => han("/Cours")}
                >
                    Cours
                </BtnMenu>
            </ConteneurBtn>
            <ConteneurBtn>
                <Validation
                    actif={
                        props.location.pathname === "/Exercices" ? true : false
                    }
                />
                <BtnMenu
                    Validation={
                        props.location.pathname === "/Exercices" ? true : false
                    }
                >
                    Exercices
                </BtnMenu>
            </ConteneurBtn>
            <ConteneurBtn>
                <Validation
                    actif={
                        props.location.pathname === "/Recherche" ? true : false
                    }
                />
                <BtnMenu
                    Validation={
                        props.location.pathname === "/Recherche" ? true : false
                    }
                    onClick={() => han("/Recherche")}
                >
                    Recherche de sujets
                </BtnMenu>
            </ConteneurBtn>
            <ConteneurBtn>
                <Validation
                    actif={props.location.pathname === "/Index" ? true : false}
                />
                <BtnMenu
                    Validation={
                        props.location.pathname === "/Index" ? true : false
                    }
                    onClick={() => han("/Index")}
                >
                    Index
                </BtnMenu>
            </ConteneurBtn>
        </Conteneur>
    );
};

export default withRouter(MenuOuvSmall);
