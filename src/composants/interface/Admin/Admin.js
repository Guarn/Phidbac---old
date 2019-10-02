import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "./Logo.svg";
import axios from "axios";
import ReactTable from "react-table";
import SUJETS from "./SS";
import "react-table/react-table.css";

const ax = axios.create({
    baseURL: "http://phidbac.fr:4000/",
    responseType: "json"
});
const Conteneur = styled.div`
    background-color: #d6d6d6;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;
const ConteneurBarreHor = styled.div`
    background-color: #31404e;
    height: 40px;
    display: flex;
    align-items: center;
`;
const Titre = styled.div`
    font-family: "Century Gothic";
    color: white;
    margin-left: 20px;
`;
const ConteneurMenuDonnees = styled.div`
    display: flex;
    flex-direction: row;
`;
const Menu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #31404e;
    width: 40px;
    height: calc(100vh - 40px);
`;
const ConteneurDonnees = styled.div``;

const Admin = (props) => {
    const [sujets, setSujets] = useState(SUJETS);

    return (
        <Conteneur>
            <ConteneurBarreHor>
                <Logo style={{ marginLeft: "8px", marginRight: "8px" }} />
                <div
                    style={{
                        width: "1px",
                        height: "40px",
                        backgroundColor: "rgba(255,153,0,0.3)"
                    }}
                ></div>
                <Titre>Phidbac.fr/Administration</Titre>
            </ConteneurBarreHor>
            <ConteneurMenuDonnees>
                <Menu>
                    <div
                        style={{
                            width: "40px",
                            height: "1px",
                            backgroundColor: "rgba(255,153,0,0.3)"
                        }}
                    ></div>
                </Menu>
                <ConteneurDonnees>
                    <ReactTable
                        getTrProps={(state, rowInfo, column, instance) => ({
                            onClick: (e) => console.log(e)
                        })}
                        data={sujets}
                        className="-striped -highlight"
                        columns={[
                            { Header: "ID", accessor: "id" },
                            {
                                Header: "Auteur",
                                accessor: "Auteur",
                                sortMethod: (a, b) => a.localeCompare(b)
                            },
                            {
                                Header: "Destination",
                                accessor: "Destination[0]"
                            },
                            {
                                Header: "Probèmes",
                                id: "Problemes",
                                accessor: "Problemes",
                                Cell: (row) => (
                                    <div
                                        style={{
                                            backgroundColor: row.value
                                                ? "rgba(255,60,0,1)"
                                                : "rgba(0,200,0,1)",
                                            width: "100%",
                                            height: "100%",
                                            transition: "all 0.2s ease-out"
                                        }}
                                    ></div>
                                )
                            }
                        ]}
                    />
                </ConteneurDonnees>
            </ConteneurMenuDonnees>
        </Conteneur>
    );
};

const mapStateToProps = (state) => {
    return { elementsCoches: state.recherche.elementsCoches };
};

export default connect(mapStateToProps)(Admin);
