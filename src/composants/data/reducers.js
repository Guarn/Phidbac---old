const etatInitial = {
    recherche: {
        options: { affichage: "" },
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
        Resultats: { sujets: [], page: 0 },
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
                        notions: action.value.data.notions,
                        series: action.value.data.series,
                        annees: action.value.data.annees,
                        destinations: action.value.data.destinations,
                        auteurs: action.value.data.auteurs,
                        sessions: action.value.data.sessions
                    }
                }
            };
            console.log("Infos menu");
            console.log(nextState);
            return nextState || state;

        case "RESULTATS":
            console.log(action);
            nextState = {
                recherche: {
                    ...state.recherche,
                    Resultats: { sujets: action.value.data }
                }
            };

            console.log("MAJ Résultats");
            console.log(nextState);
            return nextState || state;
        case "AFFICHAGE":
            nextState = {
                recherche: {
                    ...state.recherche,
                    options: { affichage: action.value }
                }
            };

            console.log("MAJ Résultats");
            console.log(nextState);
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
            console.log("MAJ cases cochées");
            return nextState || state;
        case "MENU_SWITCH":
            console.log(action.value[0]);
            console.log(state.recherche.MenuOptions.menu);
            console.log(action.value === state.recherche.MenuOptions.menu);
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
                console.log(`Menu ${action.value} fermé`);
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
                console.log(`Menu ${action.value} ouvert`);
            }
            return nextState || state;

        default:
            return state;
    }
}

export default Reducers;
