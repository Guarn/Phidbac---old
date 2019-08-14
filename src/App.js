import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Menu from "./composants/interface/Menu";
import Entete from "./composants/interface/Entete";
import Sujets from "./composants/interface/Sujets";
import Home from "./composants/interface/Home";

const ConteneurGlobal = styled.div`
    width: 100vw;
    background-color: rgba(94, 94, 94, 0.19);
    min-height: 100vh;
`;
const ConteneurPage = styled.div`
    width: 950px;
    margin: auto;
    background-color: rgba(90, 90, 90, 1);
    box-shadow: 0px 0px 6px;
    min-height: 100vh;
`;

const App = () => {
    return (
        <ConteneurGlobal>
            <ConteneurPage>
                <Entete />
                <Menu />

                <Router>
                    <Route exact path="/" component={Home} />
                    <Route path="/Recherche" component={Sujets} />
                </Router>
            </ConteneurPage>
        </ConteneurGlobal>
    );
};

export default App;
