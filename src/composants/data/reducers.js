const etatInitial = {
    recherche: {
        options: { affichage: "complet", chargement: false },
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
            sessions: [],
            recherche: "",
            typeRecherche: "tousLesMots"
        },
        Resultats: { sujets: [], page: 1, offset: 0, NBresultats: 0 },
        MenuOptions: { etat: false, menu: "" }
    }
};

function Reducers(state = etatInitial, action) {
    let nextState;
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
                        page: action.page,
                        sujets: action.value.data.rows,
                        NBresultats: action.value.data.count,
                        offset: action.offset
                    },
                    options: {
                        ...state.recherche.options,
                        chargement: action.chargement
                    }
                }
            };
            return nextState || state;
        case "RESET":
            nextState = {
                recherche: {
                    ...state.recherche,
                    elementsCoches: {
                        ...state.recherche.elementsCoches,
                        [action.value]: action.value === "recherche" ? "" : []
                    },
                    Resultats: {
                        ...state.recherche.Resultats,
                        page: 1
                    },
                    options: {
                        ...state.recherche.optioons,
                        affichage: "complet"
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
                return nextState || state;
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
                return nextState || state;
            }

        case "SUJET_PRECEDENT":
            if (
                state.recherche.Resultats.page === 1 &&
                state.recherche.Resultats.offset === 0
            ) {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        Resultats: {
                            ...state.recherche.Resultats,
                            page: state.recherche.Resultats.NBresultats
                        }
                    }
                };
            } else if (
                state.recherche.Resultats.page === 1 &&
                state.recherche.Resultats.offset > 0
            ) {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        Resultats: {
                            ...state.recherche.Resultats,
                            page: 50,
                            offset: state.recherche.Resultats.offset - 50
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
                    options: {
                        ...state.recherche.options,
                        affichage: action.value
                    },
                    Resultats: {
                        ...state.recherche.Resultats,
                        page: action.page,
                        offset: action.offset
                    }
                }
            };
            return nextState || state;
        case "CHARGEMENT":
            nextState = {
                recherche: {
                    ...state.recherche,
                    options: {
                        ...state.recherche.options,
                        chargement: action.value
                    }
                }
            };
            return nextState || state;
        case "ELEMENTS_COCHES":
            if (action.cat === "recherche" || action.cat === "typeRecherche") {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        elementsCoches: {
                            ...state.recherche.elementsCoches,
                            notions: [],
                            series: [],
                            annees: [],
                            destinations: [],
                            auteurs: [],
                            sessions: [],
                            [action.cat]: action.value
                        },
                        Resultats: {
                            ...state.recherche.Resultats,
                            page: 1
                        },
                        options: {
                            ...state.recherche.options,
                            affichage: "complet"
                        }
                    }
                };
            } else {
                nextState = {
                    recherche: {
                        ...state.recherche,
                        elementsCoches: {
                            ...state.recherche.elementsCoches,
                            recherche: "",
                            typeRecherche: "tousLesMots",
                            [action.cat]: action.value
                        },
                        Resultats: {
                            ...state.recherche.Resultats,
                            page: 1
                        },
                        options: {
                            ...state.recherche.options,
                            affichage: "complet"
                        }
                    }
                };
            }
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
