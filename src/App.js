import React, { lazy, Suspense, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Breakpoint } from "react-socks";
import { withCookies } from "react-cookie";

const Menu = lazy(() => import("./composants/interface/Menu"));
const MenuSmall = lazy(() => import("./composants/interface/MenuSmall"));
const Home = lazy(() => import("./composants/interface/Home"));
const HomeSmall = lazy(() => import("./composants/interface/HomeSmall"));
const Sujets = lazy(() => import("./composants/interface/Sujets/Sujets"));
const Cours = lazy(() => import("./composants/interface/Cours/Cours"));
const Entete = lazy(() => import("./composants/interface/Entete"));
const EnteteSmall = lazy(() => import("./composants/interface/EnteteSmall"));
const Indexx = lazy(() => import("./composants/interface/Indexx"));
const FiltresFlottants = lazy(() =>
    import("./composants/interface/Sujets/Recherche/FiltresFlottants")
);
const MenuOuvSmall = lazy(() =>
    import("./composants/interface/Menu/MenuOuvSmall")
);

const ConteneurGlobal = styled.div`
    background-color: rgba(94, 94, 94, 0.19);
    min-height: 100vh;
`;
const ConteneurGlobalSmall = styled.div`
    background-color: rgba(90, 90, 90, 1);
    min-height: 100vh;
`;
const ConteneurPage = styled.div`
    width: 1200px;
    margin: auto;
    background-color: rgba(90, 90, 90, 1);
    box-shadow: 0px 0px 6px;
    min-height: 100vh;
`;
const ConteneurPageSmall = styled.div`
    width: 100%;
    background-color: rgba(90, 90, 90, 1);
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
    const [menuMobile, setMenuMobile] = useState(false);
    const FermetureMenu = () => {
        props.dispatch({ type: "MENU_SWITCH", value: props.NomMenuOuvert });
    };
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
            <Router>
                <Breakpoint medium up>
                    {props.MenuOuvert && (
                        <PAPA id="PAPA" onClick={() => FermetureMenu()} />
                    )}

                    <ConteneurGlobal>
                        <ConteneurPage>
                            <Entete />
                            <Menu />

                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/Recherche" component={Sujets} />
                                <Route path="/Cours" component={Cours} />
                                <Route
                                    path="/Programme"
                                    render={() => (
                                        <Indexx cookies={props.cookies} />
                                    )}
                                />
                            </Switch>
                        </ConteneurPage>
                    </ConteneurGlobal>
                </Breakpoint>
                <Breakpoint small down>
                    {props.menuFiltres && (
                        <FiltresFlottants actif={props.menuFiltres} />
                    )}
                    {menuMobile && (
                        <MenuOuvSmall
                            activation={() => setMenuMobile(!menuMobile)}
                        />
                    )}
                    {!menuMobile && (
                        <ConteneurGlobalSmall>
                            <ConteneurPageSmall>
                                <EnteteSmall />
                                <MenuSmall
                                    actif={menuMobile}
                                    activation={() =>
                                        setMenuMobile(!menuMobile)
                                    }
                                />

                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={HomeSmall}
                                    />
                                    <Route
                                        path="/Recherche"
                                        component={Sujets}
                                    />
                                    <Route path="/Cours" component={Cours} />
                                    <Route path="/Index" component={Indexx} />
                                </Switch>
                            </ConteneurPageSmall>
                        </ConteneurGlobalSmall>
                    )}
                </Breakpoint>
            </Router>
        </Suspense>
    );
};

const mapStateToProps = (state) => {
    return {
        MenuOuvert: state.recherche.MenuOptions.etat,
        NomMenuOuvert: state.recherche.MenuOptions.menu,
        menuFiltres: state.recherche.MenuOptions.filtres
    };
};

export default withCookies(connect(mapStateToProps)(App));
