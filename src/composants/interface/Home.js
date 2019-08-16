import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Conteneur = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 60px;
    height: 200px;
`;

const ConteneurInfos = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 50px;
`;

const ConteneurBienvenue = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
`;

const TitreInfos = styled.div`
    font-family: "Century Gothic";
    color: rgba(246, 148, 0, 1);
    font-size: 1.3em;
`;

const Barre = styled.div`
    border: 0.5px solid rgba(246, 148, 0, 1);
    margin-bottom: 20px;
`;

const Infos = styled.div`
    color: white;
    margin-bottom: 20px;
    font-family: "Century Gothic";
    font-size: 0.8em;
`;
const InfosBienvenue = styled.div`
    color: white;
    margin-top: 20px;
    font-family: "Century Gothic";
    font-size: 1em;
`;

const TitreBienvenue = styled.div`
    font-family: "Century Gothic";
    color: rgba(246, 148, 0, 1);
    font-size: 2em;
    margin-top: -10px;
`;

const Home = (props) => {
    return (
        <Conteneur>
            <ConteneurInfos>
                <TitreInfos>l'essentiel</TitreInfos>
                <Barre />
                <Infos>
                    L'épreuve de philosophie du bac 2021, c'est dans 679 jours,
                    21 h., 20 mn., et 5 s.
                </Infos>
                <Infos>
                    Cela nous laisse pas mal de temps, mais rien n'interdit de
                    commencer déjà à se préparer...
                </Infos>
                <Barre />
                <Infos>
                    Les programmes du bac 2020 ont été publiés au BO du 26
                    juillet 2019.
                </Infos>
                <Barre />
                <Infos>
                    La base de données de sujets de bac comprend désormais 1170
                    sujets complets, soit 3510 énoncés !
                </Infos>
            </ConteneurInfos>
            <ConteneurBienvenue>
                <TitreBienvenue>Bienvenue</TitreBienvenue>
                <InfosBienvenue>
                    Le site φ' se propose d'accompagner les candidats qui
                    préparent l'épreuve de philosophie du nouveau baccalauréat,
                    dont la première session aura lieu en juin 2021.
                </InfosBienvenue>
                <InfosBienvenue>
                    La philosophie est l'une des quatre disciplines pour
                    lesquelles est maintenue une épreuve en temps limité, placée
                    à la fin de l'année de terminale. Cette épreuve a le même
                    programme, la même durée (4 heures) et le même coefficient
                    pour tous les candidats du baccalauréat général. Il en est
                    globalement de même pour le baccalauréat technologique, avec
                    quelques différences : un programme plus court tenant compte
                    de l'horaire réduit de la philosophie dans cette filière, un
                    coefficient plus faible (coeff. 2), des dispositions
                    particulières concernant les sujets.
                </InfosBienvenue>
            </ConteneurBienvenue>
        </Conteneur>
    );
};

const mapStateToProps = (state) => {
    return { menu: state.recherche.elementstMenu };
};

export default connect(mapStateToProps)(Home);
