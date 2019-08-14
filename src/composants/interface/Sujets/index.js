import React, { useEffect } from "react";
import styled from "styled-components";
import Recherche from "./Recherche";
import axios from "axios";
import { connect } from "react-redux";

const ConteneurGlobalSujets = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100%;
`;

const Resultats = styled.div`
    flex: 9;
`;

const ax = axios.create({
    baseURL: "http://192.168.0.85:4000/",
    responseType: "json"
});

const Sujets = (props) => {
    console.log(props);
    useEffect(() => {
        if (props.menu.notions.length === 0) {
            ax.get("/notions")
                .then((t) => props.dispatch({ type: "NOTIONS_MENU", value: t }))
                .catch((err) => console.log(err));
        }
    }, []);
    return (
        <ConteneurGlobalSujets>
            <Recherche />

            <Resultats />
        </ConteneurGlobalSujets>
    );
};

const mapsStateToProps = (state) => {
    return { menu: state.recherche.elementsMenu };
};

export default connect(mapsStateToProps)(Sujets);

/* Version d'origine

const ax = axios.create({
  baseURL: "http://192.168.0.85:4000/",
  responseType: "json"
});

const Sujet = styled.div`
  background-color: rgba(255, 0, 0, 0.2);
  color: black;
  margin: 10px;
  padding: 10px;
`;

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { Sujets: null };
  }

  render() {
    
      const ListeSujets = () => {
          return this.state.Sujets.map((el) => (
              <Sujet key={el.id}>{el.Sujet1}</Sujet>
          ));
      };
      const AffSujets = () => {
          const { Sujets } = this.state;
          return Sujets ? <ListeSujets /> : "chargement...";
      };
      return <AffSujets />;
  }

  async componentDidMount() {
      let userData = await ax.post("/sujets", {
          Notions1: ["LOI"]
      });
      this.setState({ Sujets: userData.data });
      console.log(this.state);
  }
}

*/
