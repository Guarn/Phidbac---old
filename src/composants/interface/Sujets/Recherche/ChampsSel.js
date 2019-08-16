import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const ChampsSel = (props) => {
    if (props.elementsCoches[props.valeur].length === 0) {
        if (props.valeur === "auteurs") {
            return "Tous";
        } else return "Toutes";
    } else {
        return props.elementsCoches[props.valeur].join(", ").toLowerCase();
    }
};

const mapStateToProps = (state) => {
    return {
        elementsCoches: state.recherche.elementsCoches,
        menu: state.recherche.elementsMenu.menu
    };
};

export default connect(mapStateToProps)(ChampsSel);
