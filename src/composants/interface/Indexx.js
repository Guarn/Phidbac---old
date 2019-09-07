import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Conteneur = styled.div`
    width: 200px;
    margin: auto;
    background-color: grey;
    margin-top: 50px;
`;
const FormIdent = styled.form`
    display: flex;
    flex-direction: column;
`;
const ChampNom = styled.input`
    margin: 5px;
`;
const ChampPassword = styled.input`
    margin: 5px;
`;

const ax = axios.create({
    baseURL: "http://phidbac.fr:4000/",
    responseType: "json"
});

function Indexx(props) {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const deco = () => {
        props.cookies.remove("token", {
            path: "/",
            domain: "phidbac.fr"
        });
        if (props.cookies.get("token")) {
            console.log(props.cookies.get("token"));
        }
    };
    const User = () => user;

    useEffect(() => {
        console.log(props.cookies.get("token"));
        if (props.cookies.get("token")) {
            ax.get("/p", {
                headers: { Authorization: props.cookies.get("token") }
            })
                .then((rep) => {
                    setUser(rep.data.req);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const formValidation = async (event) => {
        event.preventDefault();
        await ax
            .post("/login", { email: mail, password: pass })
            .then((ev) => {
                console.log(ev);
                props.cookies.set("token", "Bearer " + ev.data.token, {
                    path: "/",
                    domain: "phidbac.fr"
                });
                setUser(ev.data.prenom);
            })
            .catch((err) => console.log(err));
        await console.log(props.cookies.get("token"));
    };

    return (
        <Conteneur>
            <FormIdent onSubmit={(event) => formValidation(event)}>
                <div
                    style={{ color: "white", margin: "auto", marginTop: "5px" }}
                >
                    Identification
                </div>
                <ChampNom
                    onChange={(event) => setMail(event.target.value)}
                    placeholder="Mail"
                />
                <ChampPassword
                    onChange={(event) => setPass(event.target.value)}
                    placeholder="Mot de passe"
                />
                <button>Se connecter</button>
            </FormIdent>
            <User />
            <button onClick={() => deco()}>Deco</button>
        </Conteneur>
    );
}

export default Indexx;
