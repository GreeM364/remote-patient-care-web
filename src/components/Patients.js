import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from "./Menu";
import Header from "./Header.";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../css/main.css"
import BasicTable from "./BasicTable";
import AddPatient from "./AddPatient";
import CardPatient from "./CardPatient";
import { useTranslation } from 'react-i18next';

function Patients(props) {
    const { t } = useTranslation();
    const titlesGlobalAdmin = [t('fullName'), t('phone'), t('email'), t('birthDay'), t("doctor")];
    const titlesPatient = [t('fullName'), t('phone'), t('email'), t('birthDay')];
    const [addPatient, setAddPatient] = useState(false);
    const [patient, setPatient] = useState("")
    const [viewPatient, setViewPatient] = useState(false)


    return (
        <div className="Accounts">
            {!addPatient && !viewPatient && <h1>{t("patients")}</h1>}
            {props.roleUser === "HospitalAdministrator" && !addPatient && !viewPatient &&
                <Button onClick={setAddPatient} className="add" variant="contained"><AddCircleOutlineIcon/>{t("addNewPatient")}</Button>}
            {props.roleUser === "HospitalAdministrator" && !addPatient && !viewPatient &&
                <BasicTable page="patients" onPatient={setPatient} onViewPatient={setViewPatient}
                            onAddPatient={setAddPatient} current_token={props.current_token} titles={titlesGlobalAdmin}
                            roleUser={props.roleUser}/>}

            {(props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient") && !addPatient && !viewPatient &&
                <BasicTable page="patients" onPatient={setPatient} onViewPatient={setViewPatient}
                            onAddPatient={setAddPatient} current_token={props.current_token} titles={titlesPatient}
                            roleUser={props.roleUser} idUser={props.idUser}/>}
            {addPatient && <h1>{t("createPatient")}</h1>}
            {addPatient && <AddPatient patient={patient} onAddPatient={setAddPatient}
                                 current_token={props.current_token}/>}
            {viewPatient && <CardPatient patient={patient} roleUser={props.roleUser} onViewPatient={setViewPatient}
                                     current_token={props.current_token}/>}


        </div>
    );
}

export default Patients;
