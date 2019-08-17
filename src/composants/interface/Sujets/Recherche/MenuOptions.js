import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Conteneur = styled.div`
    min-width: 139px;
    background-color: rgba(255, 238, 212, 1);
    position: absolute;
    top: 60px;
    left: 250px;
    cursor: pointer;
    user-select: none;
    box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.2);
    z-index: 100;
    &::after {
        content: "";
        position: absolute;
        left: -10px;
        top: 10px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 10px 10px 0;
        border-color: transparent rgba(255, 238, 212, 1) transparent transparent;
    }
`;

const Champ = styled.div`
    font-family: "Century Gothic";
    padding: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const Validation = () => {
    return (
        <svg height="15" width="15" viewBox="0 0 450 450">
            <polygon
                fill="green"
                points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 
			144.423,442.58 488.878,98.123 437.055,46.298"
            />
        </svg>
    );
};

const MenuOptions = (props) => {
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
        return props.elementsMenu[props.menu].map((el) => {
            return (
                <Champ
                    key={el[Object.keys(el)]}
                    onClick={() => verifNotion(el[Object.keys(el)])}
                >
                    {el[Object.keys(el)]}
                    {props.elementsCoches[props.menu].includes(
                        el[Object.keys(el)]
                    ) && <Validation />}
                </Champ>
            );
        });
    };

    return (
        <Conteneur>
            <MapNot />
        </Conteneur>
    );
};

const mapStateToProps = (state) => {
    return {
        elementsMenu: state.recherche.elementsMenu,
        elementsCoches: state.recherche.elementsCoches,
        menu: state.recherche.MenuOptions.menu
    };
};

export default connect(mapStateToProps)(MenuOptions);
