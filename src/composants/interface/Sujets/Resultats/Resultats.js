import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

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

    .divers {
        background-color: green;
    }
`;

const ax = axios.create({
    baseURL: "http://phidbac.fr:4000/",
    responseType: "json"
});

const ConteneurChoix = styled.div`
    position: relative;
    top: 20px;
    font-size: 0.9em;
    display: flex;
    color: white;
    font-family: "Century Gothic";
    flex-direction: column;
`;

const Choix = styled.div`
    display: flex;
    cursor: pointer;
    color: ${(props) => (props.select ? "orange" : "white")};
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
    z-index: 1;
`;

const NombreSujet = styled.div`
    font-family: "Century Gothic";
    color: white;
    user-select: none;
`;

const BarreSepa = styled.div`
    color: white;
    margin-left: 2px;
    margin-right: 2px;
`;

const Resultats = (props) => {
    const {
        elementsCoches,
        resultats,
        dispatch,
        affichage,
        page,
        NBresultats,
        offset,
        chargement
    } = props;

    const affichageReduit = (aff) => {
        dispatch({ type: "AFFICHAGE", value: aff, offset: 0, page: 1 });
    };

    const ListeAffichage = styled.div`
        display: flex;
        flex-direction: row;
    `;

    useEffect(() => {
        ax.post("/resultats", { elementsCoches, offset: 0 })
            .then((rep) => {
                dispatch({
                    type: "RESULTATS",
                    value: rep,
                    offset: 0,
                    page: 1,
                    chargement: false
                });
            })
            .catch((err) => console.log(err));
    }, [elementsCoches, dispatch]);

    const sujetSuivant = () => {
        if (
            affichage === "questions" ||
            affichage === "texte" ||
            affichage === "expressions"
        ) {
            if (offset === NBresultats - (NBresultats % 50)) {
                ax.post("/resultats", {
                    elementsCoches,
                    offset2: 0
                }).then((ert) =>
                    dispatch({
                        type: "RESULTATS",
                        value: ert,
                        offset: 0,
                        page: 1
                    })
                );
            } else {
                ax.post("/resultats", {
                    elementsCoches,
                    offset2: offset + 50
                }).then((ert) =>
                    dispatch({
                        type: "RESULTATS",
                        value: ert,
                        offset: offset + 50,
                        page: 1
                    })
                );
            }
        }

        if (
            page === NBresultats % 50 &&
            offset === NBresultats - (NBresultats % 50)
        ) {
            ax.post("/resultats", {
                elementsCoches,
                offset2: 0
            }).then((ert) =>
                dispatch({
                    type: "RESULTATS",
                    value: ert,
                    offset: 0,
                    page: 1
                })
            );
        } else if (page < 50) {
            dispatch({ type: "SUJET_SUIVANT", action: true });
        } else {
            ax.post("/resultats", {
                elementsCoches,
                offset2: offset + 50
            }).then((ert) =>
                dispatch({
                    type: "RESULTATS",
                    value: ert,
                    offset: offset + 50,
                    page: 1
                })
            );
        }
    };
    const sujetPrecedent = () => {
        if (
            affichage === "questions" ||
            affichage === "texte" ||
            affichage === "expressions"
        ) {
            if (offset === 0) {
                ax.post("/resultats", {
                    elementsCoches,
                    offset2: NBresultats - (NBresultats % 50)
                }).then((ert) =>
                    dispatch({
                        type: "RESULTATS",
                        value: ert,
                        offset: NBresultats - (NBresultats % 50),
                        page: 1
                    })
                );
            } else {
                ax.post("/resultats", {
                    elementsCoches,
                    offset2: offset - 50
                }).then((ert) =>
                    dispatch({
                        type: "RESULTATS",
                        value: ert,
                        offset: offset - 50,
                        page: 1
                    })
                );
            }
        }
        if (page > 1) {
            dispatch({ type: "SUJET_PRECEDENT" });
        } else if (page === 1 && offset === 0) {
            ax.post("/resultats", {
                elementsCoches,
                offset2: NBresultats - (NBresultats % 50)
            }).then((ert) =>
                dispatch({
                    type: "RESULTATS",
                    value: ert,
                    offset: NBresultats - (NBresultats % 50),
                    page: NBresultats % 50
                })
            );
        } else {
            ax.post("/resultats", {
                elementsCoches,
                offset2: offset - 50
            }).then((ert) =>
                dispatch({
                    type: "RESULTATS",
                    value: ert,
                    offset: offset - 50,
                    page: 50
                })
            );
        }
    };

    const MapSujets = () => {
        if (chargement) {
            return (
                <NombreSujet style={{ margin: "auto", marginTop: "20px" }}>
                    Chargement...
                </NombreSujet>
            );
        }
        if (affichage === "complet") {
            let mots = elementsCoches.recherche.split(" ");
            mots.sort((a, b) => a.length - b.length);
            let TexteS = { ...resultats[page - 1] };
            let Expre = (lili) => new RegExp(lili, "gi");
            if (
                mots[0] !== "" &&
                mots[0] !== " " &&
                !TexteS.Sujet1.includes("span") &&
                !TexteS.Sujet2.includes("span") &&
                !TexteS.Sujet3.includes("span")
            ) {
                TexteS = { ...resultats[page - 1] };
                mots.map((el) => {
                    let ExpreMot = new RegExp(el, "gi");
                    TexteS.Sujet1 = TexteS.Sujet1.replace(
                        ExpreMot,
                        `<span style='background-color:yellow; color:black'>${el.toLowerCase()}</span>`
                    );
                    TexteS.Sujet2 = TexteS.Sujet2.replace(
                        ExpreMot,
                        `<span style='background-color:yellow; color:black'>${el.toLowerCase()}</span>`
                    );
                    TexteS.Sujet3 = TexteS.Sujet3.replace(
                        ExpreMot,
                        `<span style='background-color:yellow; color:black'>${el.toLowerCase()}</span>`
                    );
                });
            }

            return (
                <ConteneurResultats>
                    <ConteneurSujets>
                        <Sujet style={{ marginBottom: "2px" }}>
                            <TitreNotions>
                                <Titre>1</Titre>
                                <Notions>
                                    {resultats[page - 1].Notions1.join(" ")}
                                </Notions>
                            </TitreNotions>
                            <CorpsSujet>
                                {elementsCoches.typeRecherche === "exacte" &&
                                    ReactHtmlParser(
                                        resultats[page - 1].Sujet1.replace(
                                            Expre(elementsCoches.recherche),
                                            `<span style='background-color:yellow; color:black'>${elementsCoches.recherche.toLowerCase()}</span>`
                                        )
                                    )}
                                {elementsCoches.typeRecherche === "unDesMots" &&
                                    ReactHtmlParser(TexteS.Sujet1)}
                                {elementsCoches.typeRecherche ===
                                    "tousLesMots" &&
                                    ReactHtmlParser(TexteS.Sujet1)}
                            </CorpsSujet>
                        </Sujet>
                        <Sujet style={{ marginBottom: "2px" }}>
                            <TitreNotions>
                                <Titre>2</Titre>
                                <Notions>
                                    {resultats[page - 1].Notions2.join(" ")}
                                </Notions>
                            </TitreNotions>
                            <CorpsSujet>
                                {elementsCoches.typeRecherche === "exacte" &&
                                    ReactHtmlParser(
                                        resultats[page - 1].Sujet2.replace(
                                            Expre(elementsCoches.recherche),
                                            `<span style='background-color:yellow; color:black'>${elementsCoches.recherche.toLowerCase()}</span>`
                                        )
                                    )}
                                {elementsCoches.typeRecherche === "unDesMots" &&
                                    ReactHtmlParser(TexteS.Sujet2)}
                                {elementsCoches.typeRecherche ===
                                    "tousLesMots" &&
                                    ReactHtmlParser(TexteS.Sujet2)}
                            </CorpsSujet>
                        </Sujet>
                        <Sujet>
                            <TitreNotions>
                                <Titre>3</Titre>
                                <Notions>
                                    {resultats[page - 1].Notions3.join(" ")}
                                </Notions>
                            </TitreNotions>
                            <CorpsSujet
                                id={`CorpsSujet-${resultats[page - 1].id}`}
                            >
                                {elementsCoches.typeRecherche === "exacte" &&
                                    ReactHtmlParser(
                                        resultats[page - 1].Sujet3.replace(
                                            Expre(elementsCoches.recherche),
                                            `<span style='background-color:yellow; color:black'>${elementsCoches.recherche.toLowerCase()}</span>`
                                        )
                                    )}
                                {elementsCoches.typeRecherche === "unDesMots" &&
                                    ReactHtmlParser(TexteS.Sujet3)}
                                {elementsCoches.typeRecherche ===
                                    "tousLesMots" &&
                                    ReactHtmlParser(TexteS.Sujet3)}
                            </CorpsSujet>
                        </Sujet>
                    </ConteneurSujets>
                    <Details>
                        <PartieGauche>
                            <Etiquette>{resultats[page - 1].Annee}</Etiquette>
                            <Etiquette>{`${resultats[page - 1].Serie}`}</Etiquette>
                            <Etiquette>
                                {resultats[page - 1].Destination.join(" / ")}
                            </Etiquette>
                            <Etiquette>{resultats[page - 1].Session}</Etiquette>
                            <Etiquette>{resultats[page - 1].Code}</Etiquette>
                        </PartieGauche>
                        <Edition>Signaler un problème</Edition>
                    </Details>
                </ConteneurResultats>
            );
        } else if (affichage === "questions") {
            let listeSujets = [];
            return resultats.map((el) => {
                let mot1 = true;
                let mot2 = true;
                elementsCoches.notions.map((not) => {
                    if (!el.Notions1.includes(not)) {
                        mot1 = false;
                    }
                    if (!el.Notions2.includes(not)) {
                        mot2 = false;
                    }
                });
                if (mot1 && !listeSujets.includes(el.id)) {
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
                            <Details>
                                <PartieGauche>
                                    <Etiquette>{el.Annee}</Etiquette>
                                    <Etiquette>{el.Serie}</Etiquette>
                                    <Etiquette>
                                        {el.Destination.join(" / ")}
                                    </Etiquette>
                                    <Etiquette>{el.Session}</Etiquette>
                                    <Etiquette>{el.Code}</Etiquette>
                                </PartieGauche>
                                <Edition>Signaler un problème</Edition>
                            </Details>
                        </ConteneurResultats>
                    );
                }
                if (mot2 && !listeSujets.includes(el.id)) {
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
                            <Details>
                                <PartieGauche>
                                    <Etiquette>{el.Annee}</Etiquette>
                                    <Etiquette>{el.Serie}</Etiquette>
                                    <Etiquette>
                                        {el.Destination.join(" / ")}
                                    </Etiquette>
                                    <Etiquette>{el.Session}</Etiquette>
                                    <Etiquette>{el.Code}</Etiquette>
                                </PartieGauche>
                                <Edition>Signaler un problème</Edition>
                            </Details>
                        </ConteneurResultats>
                    );
                }
            });
        } else if (affichage === "texte") {
            return resultats.map((el) => {
                let mot3 = true;
                let listeSujets = [];
                elementsCoches.notions.map((not) => {
                    if (!el.Notions3.includes(not)) {
                        mot3 = false;
                    }
                });
                if (mot3 && !listeSujets.includes(el.id)) {
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
                                    <CorpsSujet>{el.Sujet3}</CorpsSujet>
                                </Sujet>
                            </ConteneurSujets>
                            <Details>
                                <PartieGauche>
                                    <Etiquette>{el.Annee}</Etiquette>
                                    <Etiquette>{el.Serie}</Etiquette>
                                    <Etiquette>
                                        {el.Destination.join(" / ")}
                                    </Etiquette>
                                    <Etiquette>{el.Session}</Etiquette>
                                    <Etiquette>{el.Code}</Etiquette>
                                </PartieGauche>
                                <Edition>Signaler un problème</Edition>
                            </Details>
                        </ConteneurResultats>
                    );
                }
            });
        } else if (affichage === "expressions") {
            if (elementsCoches.typeRecherche === "exacte") {
                let Expre = (lili) => new RegExp(lili, "gi");
                return resultats.map((el) => {
                    if (el.Sujet1.includes(elementsCoches.recherche)) {
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
                                        <CorpsSujet>
                                            {ReactHtmlParser(
                                                el.Sujet1.replace(
                                                    Expre(
                                                        elementsCoches.recherche
                                                    ),
                                                    `<span style='background-color:yellow; color:black'>${elementsCoches.recherche.toLowerCase()}</span>`
                                                )
                                            )}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                                <Details>
                                    <PartieGauche>
                                        <Etiquette>{el.Annee}</Etiquette>
                                        <Etiquette>{el.Serie}</Etiquette>
                                        <Etiquette>
                                            {el.Destination.join(" / ")}
                                        </Etiquette>
                                        <Etiquette>{el.Session}</Etiquette>
                                        <Etiquette>{el.Code}</Etiquette>
                                    </PartieGauche>
                                    <Edition>Signaler un problème</Edition>
                                </Details>
                            </ConteneurResultats>
                        );
                    }
                    if (el.Sujet2.includes(elementsCoches.recherche)) {
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
                                        <CorpsSujet>
                                            {ReactHtmlParser(
                                                el.Sujet2.replace(
                                                    Expre(
                                                        elementsCoches.recherche
                                                    ),
                                                    `<span style='background-color:yellow; color:black'>${elementsCoches.recherche.toLowerCase()}</span>`
                                                )
                                            )}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                                <Details>
                                    <PartieGauche>
                                        <Etiquette>{el.Annee}</Etiquette>
                                        <Etiquette>{el.Serie}</Etiquette>
                                        <Etiquette>
                                            {el.Destination.join(" / ")}
                                        </Etiquette>
                                        <Etiquette>{el.Session}</Etiquette>
                                        <Etiquette>{el.Code}</Etiquette>
                                    </PartieGauche>
                                    <Edition>Signaler un problème</Edition>
                                </Details>
                            </ConteneurResultats>
                        );
                    }
                    if (el.Sujet3.includes(elementsCoches.recherche)) {
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
                                        <CorpsSujet>
                                            {ReactHtmlParser(
                                                el.Sujet3.replace(
                                                    Expre(
                                                        elementsCoches.recherche
                                                    ),
                                                    `<span style='background-color:yellow; color:black'>${elementsCoches.recherche.toLowerCase()}</span>`
                                                )
                                            )}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                                <Details>
                                    <PartieGauche>
                                        <Etiquette>{el.Annee}</Etiquette>
                                        <Etiquette>{el.Serie}</Etiquette>
                                        <Etiquette>
                                            {el.Destination.join(" / ")}
                                        </Etiquette>
                                        <Etiquette>{el.Session}</Etiquette>
                                        <Etiquette>{el.Code}</Etiquette>
                                    </PartieGauche>
                                    <Edition>Signaler un problème</Edition>
                                </Details>
                            </ConteneurResultats>
                        );
                    }
                });
            } else if (elementsCoches.typeRecherche === "unDesMots") {
                let mots = elementsCoches.recherche.split(" ");
                mots.sort((a, b) => a.length - b.length);

                let TexteS = [...resultats];

                TexteS.map((elTexte) => {
                    if (
                        !elTexte.Sujet1.includes("span") &&
                        !elTexte.Sujet2.includes("span") &&
                        !elTexte.Sujet3.includes("span")
                    ) {
                        let ExpreMot;
                        mots.map((el) => {
                            ExpreMot = new RegExp(el, "gi");
                            elTexte.Sujet1 = elTexte.Sujet1.replace(
                                ExpreMot,
                                `<span style='background-color:yellow; color:black'>${el.toLowerCase()}</span>`
                            );
                            elTexte.Sujet2 = elTexte.Sujet2.replace(
                                ExpreMot,
                                `<span style='background-color:yellow; color:black'>${el.toLowerCase()}</span>`
                            );
                            elTexte.Sujet3 = elTexte.Sujet3.replace(
                                ExpreMot,
                                `<span style='background-color:yellow; color:black'>${el.toLowerCase()}</span>`
                            );
                        });
                    }
                });

                return TexteS.map((el) => {
                    if (el.Sujet1.includes("<span")) {
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
                                        <CorpsSujet>
                                            {ReactHtmlParser(el.Sujet1)}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                                <Details>
                                    <PartieGauche>
                                        <Etiquette>{el.Annee}</Etiquette>
                                        <Etiquette>{el.Serie}</Etiquette>
                                        <Etiquette>
                                            {el.Destination.join(" / ")}
                                        </Etiquette>
                                        <Etiquette>{el.Session}</Etiquette>
                                        <Etiquette>{el.Code}</Etiquette>
                                    </PartieGauche>
                                    <Edition>Signaler un problème</Edition>
                                </Details>
                            </ConteneurResultats>
                        );
                    }
                    if (el.Sujet2.includes("<span")) {
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
                                        <CorpsSujet>
                                            {ReactHtmlParser(el.Sujet2)}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                                <Details>
                                    <PartieGauche>
                                        <Etiquette>{el.Annee}</Etiquette>
                                        <Etiquette>{el.Serie}</Etiquette>
                                        <Etiquette>
                                            {el.Destination.join(" / ")}
                                        </Etiquette>
                                        <Etiquette>{el.Session}</Etiquette>
                                        <Etiquette>{el.Code}</Etiquette>
                                    </PartieGauche>
                                    <Edition>Signaler un problème</Edition>
                                </Details>
                            </ConteneurResultats>
                        );
                    }
                    if (el.Sujet3.includes("<span")) {
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
                                        <CorpsSujet>
                                            {ReactHtmlParser(el.Sujet3)}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                                <Details>
                                    <PartieGauche>
                                        <Etiquette>{el.Annee}</Etiquette>
                                        <Etiquette>{el.Serie}</Etiquette>
                                        <Etiquette>
                                            {el.Destination.join(" / ")}
                                        </Etiquette>
                                        <Etiquette>{el.Session}</Etiquette>
                                        <Etiquette>{el.Code}</Etiquette>
                                    </PartieGauche>
                                    <Edition>Signaler un problème</Edition>
                                </Details>
                            </ConteneurResultats>
                        );
                    }
                });
            } else if (elementsCoches.typeRecherche === "tousLesMots") {
                let mots = elementsCoches.recherche.split(" ");
                mots.sort((a, b) => a.length - b.length);

                let TexteS = [...resultats];

                TexteS.map((elTexte) => {
                    if (
                        !elTexte.Sujet1.includes("span") &&
                        !elTexte.Sujet2.includes("span") &&
                        !elTexte.Sujet3.includes("span")
                    ) {
                        let trouve1 = true;
                        let trouve2 = true;
                        let trouve3 = true;

                        mots.map((el) => {
                            if (!elTexte.Sujet1.includes(el)) {
                                trouve1 = false;
                            }
                            if (!elTexte.Sujet2.includes(el)) {
                                trouve2 = false;
                            }
                            if (!elTexte.Sujet3.includes(el)) {
                                trouve3 = false;
                            }
                        });
                        mots.map((el) => {
                            let ExpreMot = new RegExp(el, "gi");
                            if (trouve1) {
                                elTexte.Sujet1 = elTexte.Sujet1.replace(
                                    ExpreMot,
                                    `<span style='background-color:yellow; color:black'>${el.toLowerCase()}</span>`
                                );
                            }
                            if (trouve2) {
                                elTexte.Sujet2 = elTexte.Sujet2.replace(
                                    ExpreMot,
                                    `<span style='background-color:yellow; color:black'>${`${el}`.toLowerCase()}</span>`
                                );
                            }
                            if (trouve3) {
                                elTexte.Sujet3 = elTexte.Sujet3.replace(
                                    ExpreMot,
                                    `<span style='background-color:yellow; color:black'>${`${el}`.toLowerCase()}</span>`
                                );
                            }
                        });
                    }
                });

                return TexteS.map((el) => {
                    if (el.Sujet1.includes("<span")) {
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
                                        <CorpsSujet>
                                            {ReactHtmlParser(el.Sujet1)}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                                <Details>
                                    <PartieGauche>
                                        <Etiquette>{el.Annee}</Etiquette>
                                        <Etiquette>{el.Serie}</Etiquette>
                                        <Etiquette>
                                            {el.Destination.join(" / ")}
                                        </Etiquette>
                                        <Etiquette>{el.Session}</Etiquette>
                                        <Etiquette>{el.Code}</Etiquette>
                                    </PartieGauche>
                                    <Edition>Signaler un problème</Edition>
                                </Details>
                            </ConteneurResultats>
                        );
                    }
                    if (el.Sujet2.includes("<span")) {
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
                                        <CorpsSujet>
                                            {ReactHtmlParser(el.Sujet2)}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                                <Details>
                                    <PartieGauche>
                                        <Etiquette>{el.Annee}</Etiquette>
                                        <Etiquette>{el.Serie}</Etiquette>
                                        <Etiquette>
                                            {el.Destination.join(" / ")}
                                        </Etiquette>
                                        <Etiquette>{el.Session}</Etiquette>
                                        <Etiquette>{el.Code}</Etiquette>
                                    </PartieGauche>
                                    <Edition>Signaler un problème</Edition>
                                </Details>
                            </ConteneurResultats>
                        );
                    }
                    if (el.Sujet3.includes("<span")) {
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
                                        <CorpsSujet>
                                            {ReactHtmlParser(el.Sujet3)}
                                        </CorpsSujet>
                                    </Sujet>
                                </ConteneurSujets>
                                <Details>
                                    <PartieGauche>
                                        <Etiquette>{el.Annee}</Etiquette>
                                        <Etiquette>{el.Serie}</Etiquette>
                                        <Etiquette>
                                            {el.Destination.join(" / ")}
                                        </Etiquette>
                                        <Etiquette>{el.Session}</Etiquette>
                                        <Etiquette>{el.Code}</Etiquette>
                                    </PartieGauche>
                                    <Edition>Signaler un problème</Edition>
                                </Details>
                            </ConteneurResultats>
                        );
                    }
                });
            }
        }
    };

    return (
        <Conteneur>
            <ConteneurChoix>
                <div>Affichage :</div>

                <ListeAffichage>
                    <Choix
                        select={affichage === "complet"}
                        onClick={() => affichageReduit("complet")}
                    >
                        Complet
                    </Choix>
                    {elementsCoches.notions.length > 0 &&
                        elementsCoches.auteurs.length === 0 && (
                            <Choix
                                select={affichage === "questions"}
                                onClick={() => affichageReduit("questions")}
                            >
                                <BarreSepa>|</BarreSepa>
                                Questions
                            </Choix>
                        )}
                    {(elementsCoches.notions.length > 0 ||
                        elementsCoches.auteurs.length > 0) && (
                        <Choix
                            select={affichage === "texte"}
                            onClick={() => affichageReduit("texte")}
                        >
                            <BarreSepa>|</BarreSepa>Textes
                        </Choix>
                    )}
                    {elementsCoches.recherche !== "" && (
                        <Choix
                            select={affichage === "expressions"}
                            onClick={() => affichageReduit("expressions")}
                        >
                            <BarreSepa>|</BarreSepa>Expression
                        </Choix>
                    )}
                </ListeAffichage>
            </ConteneurChoix>
            {NBresultats > 0 && (
                <ConteneurNumeroSujet>
                    <SujetAvantApres onClick={() => sujetPrecedent(page)}>
                        {"<"}
                    </SujetAvantApres>
                    {affichage === "complet" && (
                        <NombreSujet>{`${page +
                            offset} / ${NBresultats}`}</NombreSujet>
                    )}
                    {affichage !== "complet" && (
                        <NombreSujet>{`${
                            offset === 0 ? "1" : offset / 50 + 1
                        } / ${(NBresultats - (NBresultats % 50)) / 50 +
                            1}`}</NombreSujet>
                    )}
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
        offset: state.recherche.Resultats.offset,
        elementsCoches: state.recherche.elementsCoches,
        menuOptions: state.recherche.elementsMenu,
        affichage: state.recherche.options.affichage,
        chargement: state.recherche.options.chargement
    };
};

export default connect(mapStateToProps)(Resultats);
