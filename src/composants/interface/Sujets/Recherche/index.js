import React from "react";
import styled from "styled-components";
import axios from "axios";
import Notion from "./Notions";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./index.css";

const ConteneurRecherche = styled.div`
    background-color: rgba(246, 148, 0, 0.3);
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 231px);
`;
const Titre = styled.div`
    color: white;
    margin: 12px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: "Roboto";
    font-size: 1em;
    user-select: none;
    cursor: default;
`;

const Champ = styled.div`
    background-color: rgba(255, 255, 255, 0.18);
    min-height: 45px;
    margin-bottom: 5px;
    cursor: pointer;
`;

const ChampTitre = styled.div`
    font-family: "Century Gothic";
    color: white;
    font-size: 1em;
    margin-left: 12px;
    margin-top: 2px;
    user-select: none;
`;
const ChampOptions = styled.div`
    font-family: "Robotoc";
    color: rgba(255, 198, 113, 1);
    font-size: 0.9em;
    margin-left: 12px;
    font-style: italic;
    user-select: none;
`;

const Recherche = (props) => {
    const menuEtat = () => {
        props.dispatch({ type: "MENU_SWITCH" });
    };

    const NotionsSel = () => {
        if (props.notionsCochees.length === 0) {
            return "Toutes";
        } else {
            return props.notionsCochees.join(", ").toLowerCase();
        }
    };

    return (
        <div style={{ flex: "3" }}>
            <ConteneurRecherche>
                <Titre>Recherche de sujets :</Titre>
                <Champ onClick={menuEtat}>
                    <ChampTitre>Notions</ChampTitre>
                    <ChampOptions>
                        <NotionsSel />
                    </ChampOptions>
                </Champ>
            </ConteneurRecherche>
            <TransitionGroup component={null}>
                {props.MenuOF && (
                    <CSSTransition
                        in={props.MenuOF}
                        classNames="dialog"
                        timeout={200}
                    >
                        <Notion className="dialog" />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        MenuOF: state.recherche.MenuO,
        notionsCochees: state.recherche.elementsCoches.notions
    };
};

export default connect(mapStateToProps)(Recherche);
