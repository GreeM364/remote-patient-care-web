import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import "../css/form.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useTranslation} from "react-i18next";

function AddHospital(props) {
    const { t } = useTranslation();
    const AddHostipal = (e) => {
        e.preventDefault();
        if (name !== "" && address !== "") {
            const user = { name: name, address: address};
            fetch("https://localhost:7070/api/Hospital", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.current_token},
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            props.onHospital(false)
        }
    };
    const getHospital =(e) =>{
        fetch(`https://localhost:7070/api/Hospital/${props.hospitalId}`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    const hospital = res.result
                    setName(hospital.name)
                    setAddress(hospital.address)
                    setDate(hospital.dataPaySubscription)
                }
            )
    }
    useEffect(() => {
        getHospital();
    }, []);
    const EditHostipal = (e) => {
        e.preventDefault();
        if (name !== "" && address !== "") {
            const user = { name: name, address: address, dataPaySubscription: date};
            fetch(`https://localhost:7070/api/Hospital/${props.hospitalId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.current_token},
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            props.onHospital(false)
        }
    };
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [date, setDate] = useState("")




    return (
        <div className="AddNew">
            <form className="addNewHospital">
                <TextField className="input" id="outlined-basic" label={t("name")} variant="outlined"
                           value={name} onChange={(e)=> setName(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("address")} variant="outlined"
                           value={address} onChange={(e)=> setAddress(e.target.value)}/>
                {props.hospitalId === "" ? <Button className="register" variant="contained" onClick={AddHostipal}>{t('register')}</Button>
                    : <Button className="register" variant="contained" onClick={EditHostipal}>{t('change')}</Button>}
                <Button  className="register" variant="contained" size="small" color="error" onClick={() => props.onHospital(false)}>
                    {t("close")}
                </Button>
            </form>
        </div>
    );
}

export default AddHospital;
