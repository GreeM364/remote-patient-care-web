import "../css/login.css"
import photo1 from '../images/image1.jpg';
import photo2 from '../images/image2.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import {useTranslation} from "react-i18next";

function LogForm(props) {
    const { t } = useTranslation();
    const handleLogin = (e) => {
        e.preventDefault();
        if (password !== "" && email !== "") {
            const user = { email: email, password: password };
            console.log(user);
            fetch("https://localhost:7070/api/Authorization/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((res) => {
                    props.onToken(res.result.token);

                    try {
                        const decoded = jwtDecode(res.result.token);
                        props.onName(decoded.unique_name);
                        if(decoded.role[0] === "User") {
                            props.onRole(decoded.role[1]);
                            if (decoded.role[1] === "Doctor")
                                props.onId(decoded.Doctor)
                            else if (decoded.role[1] === "CaregiverPatient")
                                props.onId(decoded.CaregiverPatient)
                            else if (decoded.role[1] === "Patient")
                                props.onId(decoded.Patient)
                        }
                        else {
                            props.onRole(decoded.role[0])
                            if (decoded.role[0] === "Doctor")
                                props.onId(decoded.Doctor)
                            else if (decoded.role[0] === "CaregiverPatient")
                                props.onId(decoded.CaregiverPatient)
                            else if (decoded.role[0] === "Patient")
                                props.onId(decoded.Patient)
                        }

                    } catch (error) {
                        console.error("Ошибка при расшифровке токена:", error.message);
                    }
                    props.onLog(true);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="LogForm">
            <aside class='aside_login'>
                <img style={{height: "100vh", width: "100%", margin: 0}} src={photo1}/>
            </aside>
            <section class='section_login'>
                <div class="login">
                    <img style={{height: "80px", width: "80px", margin: 0, display: "block"}} src={photo2}/>

                    <h1 style={{ fontSize: 48, display: "flex", justifyContent: "center " }}>{t("logIn")}</h1>

                    <p style={{color: "grey", display: "block"}}>{t("withEmail")}</p>

                    <form class="form_login">
                        {t("email")}<br/>
                        <TextField id="filled-basic" label={t("enterYourEmail")} variant="filled"  value={email}
                                   onChange={(e)=> setEmail(e.target.value)}/>
                        <br/>
                        {t("password")}<br/>
                        <TextField id="filled-basic" label={t("enterYourPassword")} variant="filled" value={password}
                                   onChange={e=> setPassword(e.target.value)}/>
                        <br/>
                        <Button variant="contained" onClick={handleLogin}>{t("logIn")}</Button>
                    </form>
                    <a style={{textDecoration: "none"}} href="*"><p style={{color: "darkblue", display: "block"}}>{t("forgotPassword?")}</p></a>
                </div>

            </section>
        </div>
    );
}

export default LogForm;
