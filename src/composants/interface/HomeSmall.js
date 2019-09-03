import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const ConteneurBienvenueSmall = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const InfosBienvenueSmall = styled.div`
    color: white;
    margin-top: 20px;
    font-family: "Century Gothic";
    font-size: 1em;
    text-align: justify;
`;

const TitreBienvenueSmall = styled.div`
    font-family: "Century Gothic";
    color: rgba(246, 148, 0, 1);
    font-size: 2em;
`;

const HomeSmall = (props) => {
    return (
        <ConteneurBienvenueSmall>
            <TitreBienvenueSmall>Bienvenue</TitreBienvenueSmall>
            <InfosBienvenueSmall>
                Le site φ' se propose d'accompagner les candidats qui préparent
                l'épreuve de philosophie du nouveau baccalauréat, dont la
                première session aura lieu en juin 2021.
            </InfosBienvenueSmall>
            <InfosBienvenueSmall>
                La philosophie est l'une des quatre disciplines pour lesquelles
                est maintenue une épreuve en temps limité, placée à la fin de
                l'année de terminale. Cette épreuve a le même programme, la même
                durée (4 heures) et le même coefficient pour tous les candidats
                du baccalauréat général. Il en est globalement de même pour le
                baccalauréat technologique, avec quelques différences : un
                programme plus court tenant compte de l'horaire réduit de la
                philosophie dans cette filière, un coefficient plus faible
                (coeff. 2), des dispositions particulières concernant les
                sujets.
            </InfosBienvenueSmall>
        </ConteneurBienvenueSmall>
    );
};

const mapStateToProps = (state) => {
    return { menu: state.recherche.elementstMenu };
};

export default connect(mapStateToProps)(HomeSmall);
