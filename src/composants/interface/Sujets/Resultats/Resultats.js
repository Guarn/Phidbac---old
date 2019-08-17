import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
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

const ax = axios.create({
  baseURL: "http://192.168.0.85:4000/",
  responseType: "json"
});

const Resultats = props => {
  const { elementsCoches, resultats, dispatch } = props;

  useEffect(() => {
    console.log("appel");
    console.log(resultats);

    ax.post("/resultats", { elementsCoches })
      .then(rep => dispatch({ type: "RESULTATS", value: rep }))
      .catch(err => console.log(err));
  }, [elementsCoches]);
  console.log(resultats);
  const MapSujets = () => {
    console.log(resultats);
    return resultats.map(el => (
      <ConteneurResultats>
        <Details>
          <PartieGauche>
            <Etiquette>{el.Annee}</Etiquette>
            <Etiquette>{`Série ${el.Serie}`}</Etiquette>
            <Etiquette>{el.Destination}</Etiquette>
            <Etiquette>{el.Session}</Etiquette>
            <Etiquette>{el.Code}</Etiquette>
          </PartieGauche>
          <Edition />
        </Details>
        <ConteneurSujets>
          <Sujet>
            <TitreNotions>
              <Titre>Sujet 1</Titre>
              <Notions>{el.Notions1.join(" ")}</Notions>
            </TitreNotions>
            <CorpsSujet>
              {el.Sujet1}
            </CorpsSujet>
          </Sujet>
          <InterSujet />
          <Sujet>
            <TitreNotions>
              <Titre>Sujet 2</Titre>
              <Notions>{el.Notions2.join(" ")}</Notions>
            </TitreNotions>
            <CorpsSujet>{el.Sujet2}</CorpsSujet>
          </Sujet>
          <InterSujet />
          <Sujet>
            <TitreNotions>
              <Titre>Sujet 3</Titre>
              <Notions>{el.Notions3.join(" ")}</Notions>
            </TitreNotions>
            <CorpsSujet>{el.Sujet3}</CorpsSujet>
          </Sujet>
        </ConteneurSujets>
          <InterSujet />
      </ConteneurResultats>
    ));
  };

  return <Conteneur>{resultats.length > 0 && <MapSujets />}</Conteneur>;
};

const mapStateToProps = state => {
  return {
    resultats: state.recherche.Resultats.sujets,
    elementsCoches: state.recherche.elementsCoches
  };
};

export default connect(mapStateToProps)(Resultats);
