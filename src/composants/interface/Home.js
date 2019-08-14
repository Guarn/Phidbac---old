import React, { useEffect } from "react";
import styled from "styled-components";

import { connect } from "react-redux";

const Home = (props) => {
    return <div />;
};

const mapStateToProps = (state) => {
    return { menu: state.recherche.elementstMenu };
};

export default connect(mapStateToProps)(Home);
