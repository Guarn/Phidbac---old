// Store/Reducers/favoriteReducer.js

const etatInitial = {
    recherche: {
        options: [],
        elementsMenu: { notions: [] },
        elementsCoches: { notions: [] },
        MenuOuvert: false
    }
};

function Reducers(state = etatInitial, action) {
    let nextState;
    switch (action.type) {
        case "NOTIONS_MENU":
            nextState = {
                recherche: {
                    ...state.recherche,
                    elementsMenu: { notions: action.value.data }
                }
            };
            console.log("Infos menu");
            return nextState || state;
        case "NOTIONS_COCHEES":
            nextState = {
                recherche: {
                    ...state.recherche,
                    elementsCoches: { notions: action.value }
                }
            };
            console.log("MAJ cases cochées");
            return nextState || state;
        case "MENU_SWITCH":
            nextState = {
                recherche: { ...state.recherche, MenuO: !state.recherche.MenuO }
            };
            console.log("MENU O/F");
            return nextState || state;

        default:
            return state;
    }
}

export default Reducers;
