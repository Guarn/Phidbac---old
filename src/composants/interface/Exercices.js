import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

const Exercices = (props) => {
    console.log(props);
    return <div></div>;
};

const mapStateToProps = (state) => {
    return { state: state };
};

export default withCookies(connect(mapStateToProps)(Exercices));
