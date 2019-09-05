import React, { useState } from "react";
import styled from "styled-components";
import LogoMenu from "../svg/Logo-menu.png";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

const Conteneur = styled.div`
    background-color: #ff9900;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const SousConteneurMenu = styled.div`
    height: 46px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SousConteneurLogin = styled.div`
    height: 46px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Home = styled.div`
    width: 46px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: black;
    }
    color: ${(props) => (props.actif ? "black" : "white")};
    background-color: ${(props) => (props.actif ? "rgba(0, 0, 0, 0.1)" : null)};
`;

const BtnMenu = styled.div`
    color: ${(props) => (props.actif ? "black" : "white")};
    font-family: "Century Gothic";
    padding-left: 10px;
    padding-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1em;
    cursor: pointer;
    user-select: none;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: black;
    }
    background-color: ${(props) => (props.actif ? "rgba(0, 0, 0, 0.1)" : null)};
`;

const Menu = (props) => {
    const [red, setRed] = useState(false);
    const [page, setPage] = useState("");
    let han = (UrlPage) => {
        setPage(UrlPage);
        setRed(true);
    };

    return (
        <Conteneur id="Menu">
            <SousConteneurMenu>
                {red && <Redirect push to={page} />}
                <Home
                    actif={props.location.pathname === "/"}
                    onClick={() => han("/")}
                >
                    <img src={LogoMenu} alt="a" height="25" width="25" />
                </Home>
                <BtnMenu actif={props.location.pathname === "/Programme"}>
                    Programme / épreuves
                </BtnMenu>
                <BtnMenu
                    actif={props.location.pathname === "/Cours"}
                    onClick={() => han("/Cours")}
                >
                    Cours
                </BtnMenu>
                <BtnMenu actif={props.location.pathname === "/Exercices"}>
                    Exercices
                </BtnMenu>
                <BtnMenu
                    actif={props.location.pathname === "/Recherche"}
                    onClick={() => han("/Recherche")}
                >
                    Annales
                </BtnMenu>
            </SousConteneurMenu>
            <SousConteneurLogin>
                <BtnMenu> Se connecter / S'inscrire</BtnMenu>
            </SousConteneurLogin>
        </Conteneur>
    );
};

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps)(Menu));
