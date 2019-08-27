import React, { Suspense } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Menu from "./composants/interface/Menu";
import Entete from "./composants/interface/Entete";
import Sujets from "./composants/interface/Sujets/Sujets";
import Home from "./composants/interface/Home";
import Cours from "./composants/interface/Cours/Cours";


const ConteneurGlobal = styled.div`
    background-color: rgba(94, 94, 94, 0.19);
    min-height: 100vh;
`;
const ConteneurPage = styled.div`
    width: 1200px;
    margin: auto;
    background-color: rgba(90, 90, 90, 1);
    box-shadow: 0px 0px 6px;
    min-height: 100vh;
`;

const PAPA = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: none;
    z-index: 101;
`;

const App = (props) => {
    const FermetureMenu = () => {
        props.dispatch({ type: "MENU_SWITCH", value: props.NomMenuOuvert });
    };
    return (
        <Router>
            {props.MenuOuvert && (
                <PAPA id="PAPA" onClick={() => FermetureMenu()} />
            )}
            <ConteneurGlobal>
                <ConteneurPage>
                    <Entete />
                    <Menu />
                    <Suspense fallback={<div>Cchargment...</div>}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/Recherche" component={Sujets} />
                            <Route path="/Cours" component={Cours} />
                        </Switch>
                    </Suspense>
                </ConteneurPage>
            </ConteneurGlobal>
        </Router>
    );
};

const mapStateToProps = (state) => {
    return {
        MenuOuvert: state.recherche.MenuOptions.etat,
        NomMenuOuvert: state.recherche.MenuOptions.menu
    };
};

export default connect(mapStateToProps)(App);
