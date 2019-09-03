import React, { useState, lazy, Suspense } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

const MenuOuvSmall = lazy(() => import("./Menu/MenuOuvSmall"));

const ConteneurSmall = styled.div`
    height: 46px;
    background-color: #ff9900;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const BtnMenuSmall = styled.div`
    color: white;
    font-family: "Century Gothic";
    padding-left: 10px;
    padding-right: 10px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1em;
    cursor: pointer;
    user-select: none;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: black;
    }
`;

const ConteneurBarres = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 20px;
    margin-right: 5px;
    user-select: none;
`;

const Barre = styled.div`
    background-color: white;
    height: 1px;
    width: 100%;
    margin: 2px;
    user-select: none;
`;

const TitrePage = styled.div`
    margin-left: 40px;
    color: black;
    font-family: "Century Gothic";
`;

const MenuSmall = (props) => {
    const Titre = () => {
        switch (props.location.pathname) {
            case "/Recherche":
                return "Recherche de sujets";
            case "/":
                return "Bienvenue";
            default:
                return "En construction";
        }
    };

    return (
        <Suspense
            fallback={
                <div
                    style={{
                        backgroundColor: "rgb(90,90,90)",
                        height: "100vh",
                        width: "100vw"
                    }}
                >
                    Chargement...
                </div>
            }
        >
            <ConteneurSmall id="Menu">
                <BtnMenuSmall activation onClick={() => props.activation()}>
                    <ConteneurBarres>
                        <Barre />
                        <Barre />
                        <Barre />
                    </ConteneurBarres>
                    MENU
                </BtnMenuSmall>
                <TitrePage>
                    <Titre />
                </TitrePage>
            </ConteneurSmall>
        </Suspense>
    );
};

export const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps)(MenuSmall));
