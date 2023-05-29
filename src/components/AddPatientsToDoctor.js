import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import "../css/main.css"
import AddPatient from "./AddPatient";
import TextField from "@mui/material/TextField";
import "../css/form.css"
import MenuItem from "@mui/material/MenuItem";
import {useTranslation} from "react-i18next";

function Patients(props) {
    const { t } = useTranslation();
    const getPatients =(e) =>{
        if(props.roleUser === "Doctor") {
            fetch(`https://localhost:7070/api/Patient`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result)
                        console.log(res.result.filter(i => i.doctorId == null))
                        setPatients(res.result.filter(i => i.doctorId == null));
                    }
                )
        }
        else if(props.roleUser === "CaregiverPatient") {
            fetch(`https://localhost:7070/api/Patient`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result)
                        console.log(res.result.filter(i => i.caregiverPatientId == null))
                        setPatients(res.result.filter(i => i.caregiverPatientId == null));
                    }
                )
        }
    }
    useEffect(() => {
        getPatients();
    }, []);
    const [patients, setPatients] = useState([])
    const [patientId, setPatientId] = useState("")
    const AddPatient = (e) => {
        e.preventDefault();
        if (patientId !== "" && props.roleUser === "Doctor") {
            const user = { patientId: patientId};
            fetch(`https://localhost:7070/api/Doctor/${props.idUser}/add-patient`, {
                method: "PATCH",
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

        }
        else if (patientId !== "" && props.roleUser === "CaregiverPatient") {
            const user = { patientId: patientId};
            fetch(`https://localhost:7070/api/CaregiverPatient/${props.idUser}/add-patient`, {
                method: "PATCH",
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

        }
    };


    return (
        <div className="Accounts">
            <h1>{t("patientsToMe")}</h1>
            <form className="addNewPatient">

                <TextField  className="input"
                            id="outlined-select-currency"
                            select
                            label={t("patient")}
                            helperText={t("selectPatient")}
                            defaultChecked={patientId}
                >
                    {patients.map((option) => (
                        <MenuItem key={option.id} onClick={()=> setPatientId(option.id)} value={<option value="" className="id"></option>}>
                            {option.firstName} {option.lastName}
                        </MenuItem>
                    ))}
                </TextField>
                <Button className="register" variant="contained" onClick={AddPatient}>{t('register')}</Button>
            </form>


        </div>
    );
}

export default Patients;
