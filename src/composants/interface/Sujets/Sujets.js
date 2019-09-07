import React, { useEffect, lazy, Suspense } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { Breakpoint } from "react-socks";

const Recherche = lazy(() => import("./Recherche/Recherche"));
const Resultats = lazy(() => import("./Resultats/Resultats"));
const ResultatsSmall = lazy(() => import("./Resultats/ResultatsSmall"));

const ConteneurGlobalSujets = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100%;
`;

const ax = axios.create({
    baseURL: `http://phidbac.fr:4000/`,
    responseType: "json"
});

const Sujets = (props) => {
    useEffect(() => {
        ax.get("/menu")
            .then((t) => props.dispatch({ type: "MENU", value: t }))
            .catch((err) => console.log(err));

        /* if (resultats !== []) {
            ax.post("/sujets")
                .then((t) => props.dispatch({ type: "MENU", value: t }))
                .catch((err) => console.log(err));
        }*/
    }, []);

    return (
        <Suspense
            fallback={
                <div
                    style={{
                        backgroundColor: "rgb(90,90,90)",
                        height: "100vh",
                        width: "100vw"
                    }}
                >
                    Chargement...
                </div>
            }
        >
            <Breakpoint medium up>
                <ConteneurGlobalSujets>
                    <Recherche />

                    <Resultats />
                </ConteneurGlobalSujets>
            </Breakpoint>
            <Breakpoint small down>
                <ConteneurGlobalSujets>
                    <ResultatsSmall />
                </ConteneurGlobalSujets>
            </Breakpoint>
        </Suspense>
    );
};

const mapsStateToProps = (state) => {
    return {
        menu: state.recherche.elementsMenu,
        resultats: state.recherche.Resultats.sujets,
        nomMenuOuvert: state.recherche.MenuOptions
    };
};

export default connect(mapsStateToProps)(Sujets);

/* Version d'origine

const ax = axios.create({
  baseURL: "http://phidbac.fr:4000/",
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
