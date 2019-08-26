import React, { useState, useRef } from "react";
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
    z-index: 102;
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
    display: flex;
    flex-direction: column;
    width: 100%;
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
    font-family: "Century Gothic";
    color: rgba(246, 148, 0, 1);
    font-size: 0.9em;
    margin-left: 12px;
    font-style: italic;
    user-select: none;
`;

const ConteneurChamp = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: 45px;
    margin-bottom: 5px;
    cursor: pointer;
`;
const Reset = styled.div`
    width: 20px;
    background-color: rgba(255, 0, 0, 0.5);
    margin-left: 5px;
`;

const ChampTexteForm = styled.form`
    display: flex;
    flex-direction: row;
`;
const ChampTexte = styled.input`
    height: 25px;
    margin-left: 10px;
    border-radius: 6px 0 0 6px;
    border: none;
    width: 100%;
    padding: 5px;
    font-family: "Century Gothic";
`;

const ResetTexte = styled.div`
    background-color: ${(props) =>
        props.reset ? "rgba(249, 135, 135, 1)" : "rgba(187, 187, 187, 1)"};
    margin-right: 10px;
    width: 45px;
    border-radius: 0 6px 6px 0;
`;

const ConteneurOptionsTexte = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const TexteOption = styled.div`
    font-family: "Century Gothic";
    color: white;
    cursor: pointer;

    &:hover {
        color: orange;
    }
`;

const CarreValid = styled.div`
    background-color: ${(props) =>
        props.validation ? "rgba(86,245,176,1)" : "white"};
    height: 8px;
    width: 8px;
    margin-right: 8px;
`;
const LigneOption = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
`;

const Recherche = (props) => {

    const [texte, setTexte] = useState("");

    const champAZero = useRef();

    const SoumissionTexte = (event) => {
        event.preventDefault();
        props.dispatch({
            type: "ELEMENTS_COCHES",
            cat: "recherche",
            value: texte
        });
    };

    const MAJTexte = (event) => {
        setTexte(event.target.value);
    };
    const GenFiltres = () => {
        return props.menu.map((el) => {
            let nom = Object.keys(el);
            return (
                <ConteneurChamp id={`Champ-${nom[0]}`} key={`Champ-${nom[0]}`}>
                    <Champ
                        id={`SousChamp-${nom[0]}`}
                        key={`Champ-${nom[0]}`}
                        onClick={() => menuEtat(Object.keys(el))}
                    >
                        <ChampTitre
                            id={`ChampTitre-${nom[0]}`}
                            key={`ChampTitre-${nom[0]}`}
                        >
                            {el[Object.keys(el)]}
                        </ChampTitre>
                        <ChampOptions
                            id={`ChampOptions-${nom[0]}`}
                            key={`ChampOptions-${nom[0]}`}
                        >
                            <ChampsSel
                                valeur={nom[0]}
                                id={`ChampSel-${nom[0]}`}
                                key={`NotionsSel-${nom[0]}`}
                            />
                        </ChampOptions>
                    </Champ>
                    {props.elementsCoches[nom][0] && (
                        <Reset
                            key={`Reset-${nom[0]}`}
                            onClick={() =>
                                props.dispatch({ type: "RESET", value: nom[0] })
                            }
                        />
                    )}
                </ConteneurChamp>
            );
        });
    };

    const menuEtat = (nomFiltre) => {
        props.dispatch({ type: "MENU_SWITCH", value: nomFiltre });
    };

    return (
        <div style={{ flex: "3" }}>
            <ConteneurRecherche>
                <Titre>Recherche par filtres :</Titre>
                <ConteneurFiltre>
                    <GenFiltres id={`Filtres`} />
                </ConteneurFiltre>
                <Titre>Recherche par expression :</Titre>

                <ChampTexteForm onSubmit={(ev) => SoumissionTexte(ev)}>
                    <ChampTexte
                        ref={champAZero}
                        onChange={(ev) => MAJTexte(ev)}
                        placeholder={
                            props.elementsCoches.recherche !== ""
                                ? props.elementsCoches.recherche
                                : "Recherche"
                        }
                    />
                    <ResetTexte
                        onClick={(event) => {
                            setTexte("");
                            champAZero.current.value = "";
                            event.target.value = "";
                            props.dispatch({
                                type: "RESET",
                                value: "recherche"
                            });
                        }}
                        reset={props.elementsCoches.recherche !== ""}
                    />
                </ChampTexteForm>
                <ConteneurOptionsTexte>
                    <TexteOption
                        onClick={() =>
                            props.dispatch({
                                type: "ELEMENTS_COCHES",
                                value: "tousLesMots",
                                cat: "typeRecherche"
                            })
                        }
                    >
                        <LigneOption>
                            <CarreValid
                                validation={
                                    props.elementsCoches.typeRecherche ===
                                    "tousLesMots"
                                }
                            />
                            Contient tous les mots
                        </LigneOption>
                    </TexteOption>
                    <TexteOption
                        onClick={() =>
                            props.dispatch({
                                type: "ELEMENTS_COCHES",
                                value: "exacte",
                                cat: "typeRecherche"
                            })
                        }
                    >
                        <LigneOption>
                            <CarreValid
                                validation={
                                    props.elementsCoches.typeRecherche ===
                                    "exacte"
                                }
                            />
                            Expression exacte
                        </LigneOption>
                    </TexteOption>
                    <TexteOption
                        onClick={() =>
                            props.dispatch({
                                type: "ELEMENTS_COCHES",
                                value: "unDesMots",
                                cat: "typeRecherche"
                            })
                        }
                    >
                        <LigneOption>
                            <CarreValid
                                validation={
                                    props.elementsCoches.typeRecherche ===
                                    "unDesMots"
                                }
                            />
                            Contient un des mots
                        </LigneOption>
                    </TexteOption>
                </ConteneurOptionsTexte>
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
        elementsCoches: state.recherche.elementsCoches,
        menu: state.recherche.elementsMenu.menu
    };
};

export default connect(mapStateToProps)(Recherche);
