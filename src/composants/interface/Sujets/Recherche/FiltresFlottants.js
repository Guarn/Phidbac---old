import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ChampsSel from "./ChampsSel";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Conteneur = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 150;
`;
const SousConteneur = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 20px;
    left: 20px;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
`;

const ConteneurChoixFiltres = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
`;
const TitreNotions = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic";
    background-color: grey;
    color: white;
    box-shadow: ${(props) =>
        props.select ? "none" : "-2px -2px 5px 0px rgba(0, 0, 0, 0.3) inset"};
`;
const TItreExpressions = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic";
    background-color: grey;
    color: white;
    box-shadow: ${(props) =>
        props.select ? "none" : "2px -2px 5px 0px rgba(0, 0, 0, 0.3) inset"};
`;

const ConteneurExpression = styled.div`
    width: 100%;
    position: absolute;
    height: 80%;
`;
const ConteneurFiltres = styled.div`
    position: absolute;
    width: 100%;
    margin-bottom: 20px;
`;
const ConteneurChoixSel = styled.div`
    background-color: grey;
    border-radius: 0 0 25px 25px;
    height: 100%;
    padding-top: 20px;
    overflow: hidden;
    position: relative;
`;

const Champ = styled.div`
    background-color: rgba(0, 0, 0, 0.18);
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
    color: orange;
    font-size: 0.9em;
    margin-left: 12px;
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
    margin-right: 5px;
`;
const Champ2 = styled.div`
    font-family: "Century Gothic";
    padding-left: 10px;
    min-width: 150px;
    display: flex;
    color: white;
    font-size: 1em;
    height: 15px;
    padding-bottom: 2px;
    background-color: ${(props) =>
        props.actif ? `rgba(0,0,0,0.18)` : `rgba(76,159,128,1)`};
`;
const InterChamp = styled.div`
    height: 2px;
`;

const TeteColonne = styled.div`
    font-family: "Century Gothic";
    height: 40px;
    font-weight: bold;
    font-size: 1.2em;
    color: orange;
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

const FiltresFlottants = (props) => {
    useEffect(() => {
        console.log("RENDU");
    }, [props.elementsCoches]);
    let texte = "";

    const champAZero = useRef();

    const SoumissionTexte = (event) => {
        console.log("RATE");
        event.preventDefault();
        props.dispatch({
            type: "ELEMENTS_COCHES",
            cat: "recherche",
            value: texte
        });
    };

    const MAJTexte = (event) => {
        console.log(event);
        texte = event.target.value;
        champAZero.current.focus();
    };
    const [filtres, setFiltres] = useState(true);
    const [filtresAdv, setFiltresAdv] = useState(true);

    const [menuSel, setMenuSel] = useState("");

    const verifNotion = (tt) => {
        let newState = [];
        if (props.elementsCoches[menuSel].includes(tt)) {
            let index = props.elementsCoches[menuSel].findIndex(
                (el) => el === tt
            );

            newState = [...props.elementsCoches[menuSel]];
            newState.splice(index, 1);
        } else {
            newState = [...props.elementsCoches[menuSel], tt];
        }
        props.dispatch({
            type: "ELEMENTS_COCHES",
            cat: [menuSel],
            value: newState
        });
    };

    const MapNot = () => {
        return props.elementsMenu[menuSel].map((el, index) => {
            return (
                <div
                    key={`Div-${el[Object.keys(el)[0]]}`}
                    id={`Div-${el[Object.keys(el)[0]]}`}
                    style={{ display: "inlineFlex" }}
                    className="Champ"
                >
                    <Champ2
                        key={el[Object.keys(el)[0]]}
                        id={el[Object.keys(el)[0]]}
                        onClick={() => verifNotion(el[Object.keys(el)[0]])}
                        actif={
                            !props.elementsCoches[menuSel].includes(
                                el[Object.keys(el)[0]]
                            )
                                ? false
                                : true
                        }
                        style={{
                            backgroundColor: !props.elementsCoches[
                                menuSel
                            ].includes(el[Object.keys(el)[0]])
                                ? `rgba(0,0,0,0.18)`
                                : `rgba(76,159,128,1)`
                        }}
                    >
                        {menuSel !== "annees"
                            ? el[Object.keys(el)[0]].charAt(0).toUpperCase() +
                              el[Object.keys(el)[0]].slice(1).toLowerCase()
                            : el[Object.keys(el)[0]]}
                    </Champ2>
                    <InterChamp
                        className="InterChamp"
                        key={`InterChamp-${el[Object.keys(el)[0]]}`}
                        id={`InterChamp-${el[Object.keys(el)[0]]}`}
                    />
                </div>
            );
        });
    };
    const ParExpression = () => {
        useEffect(() => {
            console.log("RENDER");
            champAZero.current.focus();
        }, []);
        return (
            <>
                <ChampTexteForm onSubmit={(ev) => SoumissionTexte(ev)}>
                    <ChampTexte
                        ref={champAZero}
                        onChange={(event) => MAJTexte(event)}
                        placeholder="Recherche"
                    />
                    <ResetTexte
                        onClick={(event) => {
                            texte = "";
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
            </>
        );
    };
    const GenFiltres = () => {
        const choixMenu = (menuChoisi) => {
            setMenuSel(menuChoisi);
            setFiltresAdv(!filtresAdv);
        };

        return props.menu.map((el) => {
            let nom = Object.keys(el);
            return (
                <ConteneurChamp id={`Champ-${nom[0]}`} key={`Champ-${nom[0]}`}>
                    <Champ
                        id={`SousChamp-${nom[0]}`}
                        key={`Champ-${nom[0]}`}
                        onClick={() => choixMenu(nom[0])}
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

    return (
        <Conteneur>
            <SousConteneur>
                <ConteneurChoixFiltres>
                    <TitreNotions
                        select={filtres}
                        onClick={() => setFiltres(true)}
                    >
                        Notions
                    </TitreNotions>
                    <TItreExpressions
                        select={!filtres}
                        onClick={() => setFiltres(false)}
                    >
                        Expressions
                    </TItreExpressions>
                </ConteneurChoixFiltres>
                <ConteneurChoixSel>
                    {!filtres && <ParExpression />}
                    {filtres && (
                        <TransitionGroup>
                            {filtresAdv && (
                                <CSSTransition
                                    in={filtresAdv}
                                    classNames="filtres"
                                    timeout={200}
                                >
                                    <ConteneurFiltres className="filtres">
                                        <GenFiltres />
                                    </ConteneurFiltres>
                                </CSSTransition>
                            )}
                            {!filtresAdv && (
                                <CSSTransition
                                    in={!filtresAdv}
                                    classNames="filtres2"
                                    timeout={200}
                                >
                                    <div>
                                        <TeteColonne
                                            onClick={() => setFiltresAdv(true)}
                                        >
                                            {`◄ ${menuSel}`}
                                        </TeteColonne>
                                        <ConteneurExpression
                                            style={{ overflow: "scroll" }}
                                            className="filtres2"
                                        >
                                            <MapNot />
                                        </ConteneurExpression>
                                    </div>
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    )}
                </ConteneurChoixSel>
            </SousConteneur>
        </Conteneur>
    );
};

const mapStateToProps = (state) => {
    return {
        elementsMenu: state.recherche.elementsMenu,
        elementsCoches: state.recherche.elementsCoches,
        MenuOuvert: state.recherche.MenuOptions.etat,
        menu: state.recherche.elementsMenu.menu
    };
};

export default connect(mapStateToProps)(FiltresFlottants);
