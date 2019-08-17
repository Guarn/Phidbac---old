import React from "react";
import styled from "styled-components";
import MenuOptions from "./MenuOptions";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./index.css";
import ChampsSel from "./ChampsSel";

const ConteneurRecherche = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 231px);
`;

const ConteneurFiltre = styled.div`
    
    display: flex;
    flex-direction: column;
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
    const GenFiltres = () => {
        return props.menu.map((el) => {
            let nom = Object.keys(el);
            return (
                <Champ
                    key={`Champ-${nom[0]}`}
                    onClick={() => menuEtat(Object.keys(el))}
                >
                    <ChampTitre key={`ChampTitre-${nom[0]}`}>
                        {el[Object.keys(el)]}
                    </ChampTitre>
                    <ChampOptions key={`ChampOptions-${nom[0]}`}>
                        <ChampsSel
                            valeur={nom[0]}
                            key={`NotionsSel-${nom[0]}`}
                        />
                    </ChampOptions>
                </Champ>
            );
        });
    };

    const Filtres = () => {
        return (
            <ConteneurFiltre>
                <GenFiltres />
            </ConteneurFiltre>
        );
    };

    const menuEtat = (nomFiltre) => {
        props.dispatch({ type: "MENU_SWITCH", value: nomFiltre });
        console.log(nomFiltre);
    };

    return (
    <div style={{backgroundColor:"rgba(246, 148, 0, 0.3)", flex: "3" }}>
            <ConteneurRecherche>
                <Titre>Recherche de sujets :</Titre>
                <Filtres />
            </ConteneurRecherche>
            <TransitionGroup component={null}>
                {props.MenuOF && (
                    <CSSTransition
                        in={props.MenuOF}
                        classNames="dialog"
                        timeout={200}
                    >
                        <MenuOptions className="dialog" />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        MenuOF: state.recherche.MenuOptions.etat,
        notionsCochees: state.recherche.elementsCoches.notions,
        menu: state.recherche.elementsMenu.menu
    };
};

export default connect(mapStateToProps)(Recherche);
