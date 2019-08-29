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

const MenuSmall = (props) => {
    const [red, setRed] = useState(false);
    const [page, setPage] = useState("");
    let han = (UrlPage) => {
        setPage(UrlPage);
        setRed(true);
    };

    return (
        <ConteneurSmall id="Menu">
            {red && <Redirect push to={page} />}
            <BtnMenuSmall>MENU</BtnMenuSmall>
        </ConteneurSmall>
    );
};

export const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MenuSmall);
