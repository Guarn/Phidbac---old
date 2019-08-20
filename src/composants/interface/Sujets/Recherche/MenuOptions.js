import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Conteneur = styled.div`
    padding: 4px;
    background-color: rgba(120, 120, 120, 1);
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    user-select: none;
    box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.2);
    z-index: 102;
    display: inline-flex;
    flex-direction: column;
`;

const Champ = styled.div`
    font-family: "Century Gothic";
    padding-left: 10px;
    min-width: 150px;
    display: flex;
    color: white;
    font-size: 0.9em;
    height: 15px;
    padding-bottom:2px;
`;
const InterChamp = styled.div`
    height: 2px;
`;

const MenuOptions = (props) => {
    let ChampN = document
        .getElementById(`Champ-${props.menu}`)
        .getBoundingClientRect();
    let MenuN = document.getElementById("Menu").getBoundingClientRect();
    let offsetX = `${ChampN.top - MenuN.bottom}px`;
    let offsetY = `${ChampN.right - ChampN.left + 5}px`;

    const verifNotion = (tt) => {
        let newState = [];
        if (props.elementsCoches[props.menu].includes(tt)) {
            let index = props.elementsCoches[props.menu].findIndex(
                (el) => el === tt
            );

            newState = [...props.elementsCoches[props.menu]];
            newState.splice(index, 1);
        } else {
            newState = [...props.elementsCoches[props.menu], tt];
        }
        props.dispatch({
            type: "ELEMENTS_COCHES",
            cat: [props.menu],
            value: newState
        });
    };

    const MapNot = () => {
        return props.elementsMenu[props.menu].map((el, index) => {
            return (
                <div
                    key={`Div-${el[Object.keys(el)[0]]}`}
                    id={`Div-${el[Object.keys(el)[0]]}`}
                    style={{ display: "inlineFlex" }}
                >
                    <Champ
                        key={el[Object.keys(el)[0]]}
                        id={el[Object.keys(el)[0]]}
                        onClick={() => verifNotion(el[Object.keys(el)[0]])}
                        style={{
                            backgroundColor: !props.elementsCoches[
                                props.menu
                            ].includes(el[Object.keys(el)[0]])
                                ? `rgba(0,0,0,0.18)`
                                : `rgba(76,159,128,1)`,
                            hover: { backgroundColor: "rgba(0, 0, 0, 0.1);" }
                        }}
                    >
                        {props.menu[0] !== "annees"
                            ? el[Object.keys(el)[0]].charAt(0).toUpperCase() +
                              el[Object.keys(el)[0]].slice(1).toLowerCase()
                            : el[Object.keys(el)[0]]}
                    </Champ>
                    {index + 1 < props.elementsMenu[props.menu].length && (
                        <InterChamp
                            key={`InterChamp-${el[Object.keys(el)[0]]}`}
                            id={`InterChamp-${el[Object.keys(el)[0]]}`}
                        />
                    )}
                </div>
            );
        });
    };

    return (
        <Conteneur
            className="MenuOuvert"
            id={`Options-${props.menu}`}
            style={{ top: offsetX, left: offsetY }}
        >
            <MapNot />
        </Conteneur>
    );
};

const mapStateToProps = (state) => {
    return {
        elementsMenu: state.recherche.elementsMenu,
        elementsCoches: state.recherche.elementsCoches,
        menu: state.recherche.MenuOptions.menu,
        MenuOuvert: state.recherche.MenuOptions.etat
    };
};

export default connect(mapStateToProps)(MenuOptions);
