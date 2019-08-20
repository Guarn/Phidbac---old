const etatInitial = {
    recherche: {
        options: { affichage: "complet", nbAffichageReduit: 10 },
        elementsMenu: {
            menu: [
                { notions: "Notions" },
                { series: "Séries" },
                { annees: "Années" },
                { destinations: "Destinations" },
                { auteurs: "Auteurs" },
                { sessions: "Sessions" }
            ],
            notions: [],
            series: [],
            annees: [],
            destinations: [],
            auteurs: [],
            sessions: []
        },
        elementsCoches: {
            notions: [],
            series: [],
            annees: [],
            destinations: [],
            auteurs: [],
            sessions: []
        },
        Resultats: { sujets: [], page: 1, offset: 0, NBresultats: 0 },
        MenuOptions: { etat: false, menu: "" }
    }
};

function Reducers(state = etatInitial, action) {
    let nextState;
    console.log(action);
    switch (action.type) {
        case "MENU":
            nextState = {
                recherche: {
                    ...state.recherche,
                    elementsMenu: {
                        menu: [...state.recherche.elementsMenu.menu],
                        notions: action.value.data.notions.sort((a, b) =>
                            a.Notion.localeCompare(b.Notion)
                        ),
                        series: action.value.data.series.sort((a, b) =>
                            a.Serie.localeCompare(b.Serie)
                        ),
                        annees: action.value.data.annees.sort(
                            (a, b) => a.Annee - b.Annee
                        ),
                        destinations: action.value.data.destinations.sort(
                            (a, b) => a.Destination.localeCompare(b.Destination)
                        ),
                        auteurs: action.value.data.auteurs.sort((a, b) =>
                            a.Auteur.localeCompare(b.Auteur)
                        ),
                        sessions: action.value.data.sessions.sort((a, b) =>
                            a.Session.localeCompare(b.Session)
                        )
                    }
                }
            };
            return nextState || state;
        case "RESULTATS":
            nextState = {
                recherche: {
                    ...state.recherche,
                    Resultats: {
                        ...state.recherche.Resultats,
                        page: 1,
                        sujets: action.value.data.rows,
                        NBresultats: action.value.data.count
                    }
                }
            };
            return nextState || state;
        case "SUJET_SUIVANT":
            if (
                state.recherche.Resultats.page ===
                state.recherche.Resultats.NBresultats
            ) {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        Resultats: {
                            ...state.recherche.Resultats,
                            page: 1
                        }
                    }
                };
            } else {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        Resultats: {
                            ...state.recherche.Resultats,
                            page: state.recherche.Resultats.page + 1
                        }
                    }
                };
            }
            return nextState || state;
        case "SUJET_PRECEDENT":
            console.log(action);
            if (state.recherche.Resultats.page === 1) {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        Resultats: {
                            ...state.recherche.Resultats,
                            page: state.recherche.Resultats.NBresultats
                        }
                    }
                };
            } else {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        Resultats: {
                            ...state.recherche.Resultats,
                            page: state.recherche.Resultats.page - 1
                        }
                    }
                };
            }
            return nextState || state;
        case "AFFICHAGE":
            nextState = {
                recherche: {
                    ...state.recherche,
                    options: { affichage: action.value }
                }
            };
            return nextState || state;
        case "ELEMENTS_COCHES":
            nextState = {
                recherche: {
                    ...state.recherche,
                    elementsCoches: {
                        ...state.recherche.elementsCoches,
                        [action.cat]: action.value
                    }
                }
            };
            return nextState || state;
        case "MENU_SWITCH":
            if (
                action.value[0] === state.recherche.MenuOptions.menu[0] &&
                state.recherche.MenuOptions.etat
            ) {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        MenuOptions: {
                            ...state.recherche.MenuOptions,
                            etat: false
                        }
                    }
                };
            } else {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        MenuOptions: {
                            menu: action.value,
                            etat: true
                        }
                    }
                };
            }
            return nextState || state;

        default:
            return state;
    }
}

export default Reducers;
