import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Conteneur = styled.div`
    flex: 9;
    display: flex;
    flex-direction: column;
    padding: 50px;
`;

const ConteneurResultats = styled.div`
    display: flex;
    flex-direction: column;
`;

const Details = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 28px;

    align-items: flex-end;
`;

const PartieGauche = styled.div`
    display: flex;
    flex-direction: row;
`;
const Etiquette = styled.div`
    background-color: rgba(246, 148, 0, 1);
    font-family: "Century Gothic";
    font-size: 0.7em;
    text-align: center;
    margin: auto;
    margin-right: 10px;
    padding: 8px;
`;

const Edition = styled.div`
    height: 24px;
    width: 24px;
    position: relative;
    right: 30px;
    background-color: rgba(255, 255, 255, 0.15);
`;
const ConteneurSujets = styled.div`
    background-color: rgba(255, 255, 255, 0.15);
    padding: 20px;
`;

const Sujet = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.16);
    padding: 10px;
    min-height: 60px;
    justify-content: space-between;
`;

const TitreNotions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Titre = styled.div`
    background-color: white;
    color: rgba(246, 148, 0, 1);
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    font-family: "Century Gothic";
    font-size: 0.7em;
    font-style: italic;
    position: relative;
    top: -20px;
    left: 20px;
    z-index: 1;
`;

const Notions = styled.div`
    color: white;
    font-family: "Century Gothic";
    font-size: 0.8em;
    font-style: italic;
`;

const CorpsSujet = styled.div`
    color: white;
    font-family: "Roboto";
    font-weight: lighter;
`;

const InterSujet = styled.div`
    height: 30px;
`;

const Resultats = (props) => {
    return (
        <Conteneur>
            <ConteneurResultats>
                <Details>
                    <PartieGauche>
                        <Etiquette>2011</Etiquette>
                        <Etiquette>Série S</Etiquette>
                        <Etiquette>Amérique du nord</Etiquette>
                        <Etiquette>Normale</Etiquette>
                        <Etiquette>11PHSCAN1</Etiquette>
                    </PartieGauche>
                    <Edition />
                </Details>
                <ConteneurSujets>
                    <Sujet>
                        <TitreNotions>
                            <Titre>Sujet 1</Titre>
                            <Notions>CONSCIENCE INCONSCIENT SUJET</Notions>
                        </TitreNotions>
                        <CorpsSujet>
                            L'hypothèse de l'inconscient exclut-elle toute
                            connaissance de soi ?
                        </CorpsSujet>
                    </Sujet>
                    <InterSujet />
                    <Sujet>
                        <TitreNotions>
                            <Titre>Sujet 2</Titre>
                            <Notions>BONHEUR DROIT</Notions>
                        </TitreNotions>
                        <CorpsSujet>Le bonheur est-il un droit ?</CorpsSujet>
                    </Sujet>
                    <InterSujet />
                    <Sujet>
                        <TitreNotions>
                            <Titre>Sujet 3</Titre>
                            <Notions>
                                CULTURE ÉTAT HISTOIRE MORALE SOCIÉTÉ
                            </Notions>
                        </TitreNotions>
                        <CorpsSujet>
                            <p>
                                Nous sommes cultivés au plus haut degré par
                                l'art et par la science. Nous sommes civilisés,
                                jusqu'à en être accablés, par la politesse et
                                les bienséances sociales de toute sorte. Mais
                                nous sommes encore loin de pouvoir nous tenir
                                pour déjà moralisés. Si en effet l'idée de la
                                moralité appartient bien à la culture, la mise
                                en pratique de cette idée qui n'aboutit qu'à une
                                apparence de moralité dans l'amour de l'honneur
                                et la bienséance extérieure, constitue
                                simplement la civilisation. Or tant que les
                                États jettent toutes leurs forces dans leurs
                                projets d'extension vains et violents, tant
                                qu'ils entravent ainsi sans cesse le lent effort
                                de formation intérieure du mode de penser de
                                leurs citoyens, et qu'ils leur retirent ainsi
                                toute aide en vue de cette fin, une fin
                                semblable ne peut être atteinte, car sa
                                réalisation exige que, par un long travail
                                intérieur, chaque communauté forme ses citoyens.
                                Or, tout bien qui n'est pas greffé sur une
                                intention moralement bonne n'est qu'apparence
                                criante et brillante misère. C'est dans cet état
                                que l'espèce humaine restera jusqu'à ce qu'elle
                                s'arrache par son travail (...) à l'état
                                chaotique de ses relations internationales.
                            </p>{" "}
                            <p>
                                KANT, Idée d'une histoire universelle au point
                                de vue cosmopolitique
                            </p>
                        </CorpsSujet>
                    </Sujet>
                </ConteneurSujets>
            </ConteneurResultats>
        </Conteneur>
    );
};

const mapStateToProps = (state) => {
    return { resultats: state.recherche.Resultats.sujets };
};

export default connect(mapStateToProps)(Resultats);
