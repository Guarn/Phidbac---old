import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { numberLiteralTypeAnnotation } from "@babel/types";

const Conteneur = styled.div`
    flex: 9;
    display: flex;
    flex-direction: column;
    padding: 30px;
`;

const ConteneurResultats = styled.div`
    display: flex;
    flex-direction: column;
`;

const Details = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
    align-items: flex-start;
`;

const PartieGauche = styled.div`
    display: flex;
    flex-direction: row;
`;
const Etiquette = styled.div`
    font-family: "Century Gothic";
    font-size: 0.7em;
    text-align: center;
    margin: auto;
    margin-right: 10px;
    padding: 5px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-top: none;
    color: white;
    border-radius: 0 0 5px 5px;
`;

const Edition = styled.div`
    position: relative;
    right: 30px;
    padding: 5px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-top: none;
    color: white;
    border-radius: 0 0 5px 5px;
    font-family: "Century Gothic";
    font-size: 0.7em;
    text-align: center;
    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: orange;
    }
`;
const ConteneurSujets = styled.div`
    background-color: rgba(255, 255, 255, 0.15);
    padding: 2px;
    margin-top: 30px;
`;

const Sujet = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.16);
    min-height: 60px;
    justify-content: space-between;
`;

const TitreNotions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Titre = styled.div`
    background-color: rgba(255, 255, 255, 0.15);
    color: rgba(246, 148, 0, 1);
    padding: 5px 10px;
    font-family: "Century Gothic";
    font-size: 1em;
    font-style: italic;

    z-index: 1;
`;

const Notions = styled.div`
    color: white;
    font-family: "Century Gothic";
    font-size: 0.8em;
    font-style: italic;
    margin-top: 5px;
    margin-right: 5px;
`;

const CorpsSujet = styled.div`
    color: white;
    font-family: "Century Gothic";
    margin: 15px;
    margin-top: 20px;
    font-size: 1em;
`;

const ax = axios.create({
    baseURL: "http://192.168.0.85:4000/",
    responseType: "json"
});

const ConteneurChoix = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
`;

const Choix = styled.div`
    box-sizing: border-box;
    margin-right: 10px;
    width: 30px;
    border: 0.5px solid rgba(255, 255, 255, 0.7);
    border-radius: 3px 3px 3px 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        border: 0.5px solid orange;
    }
`;
const Ligne = styled.div`
    width: 10px;
    border: 0.5px solid white;
`;

const ConteneurNumeroSujet = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SujetAvantApres = styled.div`
    background-color: rgba(130, 130, 130, 1);
    color: white;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
`;

const NombreSujet = styled.div`
    font-family: "Century Gothic";
    color: white;
    user-select: none;
`;

const Resultats = (props) => {
    const {
        elementsCoches,
        resultats,
        dispatch,
        affichage,
        page,
        NBresultats
    } = props;
    const affichageComplet = () => {
        dispatch({ type: "AFFICHAGE", value: "complet" });
    };
    const affichageReduit = () => {
        dispatch({ type: "AFFICHAGE", value: "reduit" });
    };
    useEffect(() => {
        ax.post("/resultats", { elementsCoches })
            .then((rep) => dispatch({ type: "RESULTATS", value: rep }))
            .catch((err) => console.log(err));
    }, [elementsCoches]);

    const sujetSuivant = () => {
        dispatch({ type: "SUJET_SUIVANT", action: true });
    };
    const sujetPrecedent = () => {
        dispatch({ type: "SUJET_PRECEDENT" });
    };

    const MapSujets = () => {
        if (affichage === "complet") {
            let SujAff = resultats[page - 1];
            return (
                <ConteneurResultats>
                    <ConteneurSujets>
                        <Sujet style={{ marginBottom: "2px" }}>
                            <TitreNotions>
                                <Titre>1</Titre>
                                <Notions>{SujAff.Notions1.join(" ")}</Notions>
                            </TitreNotions>
                            <CorpsSujet>{SujAff.Sujet1}</CorpsSujet>
                        </Sujet>
                        <Sujet style={{ marginBottom: "2px" }}>
                            <TitreNotions>
                                <Titre>2</Titre>
                                <Notions>{SujAff.Notions2.join(" ")}</Notions>
                            </TitreNotions>
                            <CorpsSujet>{SujAff.Sujet2}</CorpsSujet>
                        </Sujet>
                        <Sujet>
                            <TitreNotions>
                                <Titre>3</Titre>
                                <Notions>{SujAff.Notions3.join(" ")}</Notions>
                            </TitreNotions>
                            <CorpsSujet
                                style={{
                                    textAlign: "justify",
                                    textJustify: "inter-word"
                                }}
                            >
                                {SujAff.Sujet3}
                            </CorpsSujet>
                        </Sujet>
                    </ConteneurSujets>
                    <Details>
                        <PartieGauche>
                            <Etiquette>{SujAff.Annee}</Etiquette>
                            <Etiquette>{`Série ${SujAff.Serie}`}</Etiquette>
                            <Etiquette>
                                {SujAff.Destination.join(" / ")}
                            </Etiquette>
                            <Etiquette>{SujAff.Session}</Etiquette>
                            <Etiquette>{SujAff.Code}</Etiquette>
                        </PartieGauche>
                        <Edition>Signaler un problème</Edition>
                    </Details>
                </ConteneurResultats>
            );
        } else {
            let listeSujets = [];
            return resultats.map((el) =>
                elementsCoches.notions.map((not) => {
                    if (
                        !listeSujets.includes(el.id) &&
                        el.Notions1.includes(not)
                    ) {
                        listeSujets.push(el.id);
                        return (
                            <ConteneurResultats>
                                <ConteneurSujets>
                                    <Sujet>
                                        <TitreNotions>
                                            <Titre>1</Titre>
                                            <Notions>
                                                {el.Notions1.join(" ")}
                                            </Notions>
                                        </TitreNotions>
                                        <CorpsSujet>{el.Sujet1}</CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                            </ConteneurResultats>
                        );
                    }
                    if (
                        !listeSujets.includes(el.id) &&
                        el.Notions2.includes(not)
                    ) {
                        listeSujets.push(el.id);
                        return (
                            <ConteneurResultats>
                                <ConteneurSujets>
                                    <Sujet>
                                        <TitreNotions>
                                            <Titre>2</Titre>
                                            <Notions>
                                                {el.Notions2.join(" ")}
                                            </Notions>
                                        </TitreNotions>
                                        <CorpsSujet>{el.Sujet2}</CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                            </ConteneurResultats>
                        );
                    }
                    if (
                        !listeSujets.includes(el.id) &&
                        el.Notions3.includes(not)
                    ) {
                        listeSujets.push(el.id);
                        return (
                            <ConteneurResultats>
                                <ConteneurSujets>
                                    <Sujet>
                                        <TitreNotions>
                                            <Titre>3</Titre>
                                            <Notions>
                                                {el.Notions3.join(" ")}
                                            </Notions>
                                        </TitreNotions>
                                        <CorpsSujet
                                            style={{
                                                textAlign: "justify",
                                                textJustify: "inter-word"
                                            }}
                                        >
                                            {el.Sujet3}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                            </ConteneurResultats>
                        );
                    }
                })
            );
        }
    };

    return (
        <Conteneur>
            <ConteneurChoix>
                <Choix onClick={() => affichageComplet()}>
                    <Ligne />
                </Choix>
                <Choix onClick={() => affichageReduit()}>
                    <Ligne />{" "}
                    <Ligne style={{ marginTop: "2px", marginBottom: "2px" }} />{" "}
                    <Ligne />
                </Choix>
            </ConteneurChoix>
            {NBresultats > 0 && (
                <ConteneurNumeroSujet>
                    <SujetAvantApres onClick={() => sujetPrecedent(page)}>
                        {"<"}
                    </SujetAvantApres>
                    <NombreSujet>{`${page} / ${NBresultats}`}</NombreSujet>
                    <SujetAvantApres onClick={() => sujetSuivant(page)}>
                        {">"}
                    </SujetAvantApres>
                </ConteneurNumeroSujet>
            )}
            {NBresultats === 0 && (
                <NombreSujet style={{ margin: "auto", marginTop: "20px" }}>
                    Aucun sujet ne répond à ces critères.
                </NombreSujet>
            )}
            {resultats.length > 0 && <MapSujets />}
        </Conteneur>
    );
};

const mapStateToProps = (state) => {
    return {
        resultats: state.recherche.Resultats.sujets,
        NBresultats: state.recherche.Resultats.NBresultats,
        page: state.recherche.Resultats.page,
        elementsCoches: state.recherche.elementsCoches,
        menuOptions: state.recherche.elementsMenu,
        affichage: state.recherche.options.affichage
    };
};

export default connect(mapStateToProps)(Resultats);
