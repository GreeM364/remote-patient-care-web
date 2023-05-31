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

function Patients({ current_token, idUser, roleUser, searchQuery}) {
    const { t } = useTranslation();
    const titlesAdmin = [t('fullName'), t('phone'), t('email'), t('caregiver'), t("doctor")];
    const titlesPatient = [t('fullName'), t('phone'), t('email'), t('birthDay')];
    const [addPatient, setAddPatient] = useState(false);
    const [patient, setPatient] = useState("")
    const [viewPatient, setViewPatient] = useState(false)
    console.log("Input patient: ", searchQuery)

    return (
        <div className="Accounts">
            {!addPatient && !viewPatient && <h1>{t("patients")}</h1>}
            {roleUser === "HospitalAdministrator" && !addPatient && !viewPatient &&
                <Button onClick={setAddPatient} className="add" variant="contained" ><AddCircleOutlineIcon/>{t("createNewPatient")}</Button>}
            {roleUser === "HospitalAdministrator" && !addPatient && !viewPatient &&
                <BasicTable page="patients" onPatient={setPatient} onViewPatient={setViewPatient}
                            onAddPatient={setAddPatient} current_token={current_token} titles={titlesAdmin}
                            roleUser={roleUser} searchQuery={searchQuery}/>}

            {(roleUser === "Doctor" || roleUser === "CaregiverPatient") && !addPatient && !viewPatient &&
                <BasicTable page="patients" onPatient={setPatient} onViewPatient={setViewPatient}
                            onAddPatient={setAddPatient} current_token={current_token} titles={titlesPatient}
                            roleUser={roleUser} idUser={idUser} searchQuery={searchQuery}/>}
            {addPatient && <h1>{t("createPatient")}</h1>}
            {addPatient && <AddPatient patient={patient} onAddPatient={setAddPatient}
                                 current_token={current_token}/>}
            {viewPatient && <CardPatient patient={patient} roleUser={roleUser} onViewPatient={setViewPatient}
                                     current_token={current_token}/>}

        </div>
    );
}

export default Patients;
