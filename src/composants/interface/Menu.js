import React, { useState } from "react";
import styled from "styled-components";
import LogoMenu from "../svg/Logo-menu.png";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Conteneur = styled.div`
    height: 46px;
    background-color: #ff9900;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const ConteneurSmall = styled.div`
    height: 46px;
    background-color: #ff9900;
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
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

const BtnMenu = styled.div`
    color: white;
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
`;
const BtnMenuSmall = styled.div`
    color: white;
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
            {red && <Redirect push to={page} />}
            <Home onClick={() => han("/")}>
                <img src={LogoMenu} alt="a" height="25" width="25" />
            </Home>
            <BtnMenu>le programme et les épreuves</BtnMenu>
            <BtnMenu onClick={() => han("/Cours")}>le cours</BtnMenu>
            <BtnMenu>les exercices</BtnMenu>
            <BtnMenu onClick={() => han("/Recherche")}>les sujets</BtnMenu>
            <BtnMenu>les index</BtnMenu>
        </Conteneur>
    );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Menu);
