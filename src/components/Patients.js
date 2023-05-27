import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from "./Menu";
import Header from "./Header.";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../css/main.css"
import BasicTable from "./BasicTable";
import AddPatient from "./AddPatient";
import CardPatient from "./CardPatient";

function Patients(props) {
    const titlesGlobalAdmin = ["FullName", "Phone", "Email", "BirthDay", "Doctor"];
    const titlesPatient = ["FullName", "Phone", "Email", "BirthDay"];
    const [addPatient, setAddPatient] = useState(false);
    const [patient, setPatient] = useState("")
    const [viewPatient, setViewPatient] = useState(false)


    return (
        <div className="Accounts">
            {!addPatient && !viewPatient && <h1>Patients</h1>}
            {props.roleUser === "HospitalAdministrator" && !addPatient && !viewPatient &&
                <Button onClick={setAddPatient} className="add" variant="contained"><AddCircleOutlineIcon/> Add new patient</Button>}
            {props.roleUser === "HospitalAdministrator" && !addPatient && !viewPatient &&
                <BasicTable page="patients" onPatient={setPatient} onViewPatient={setViewPatient}
                            onAddPatient={setAddPatient} current_token={props.current_token} titles={titlesGlobalAdmin}
                            roleUser={props.roleUser}/>}

            {(props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient") && !addPatient && !viewPatient &&
                <BasicTable page="patients" onPatient={setPatient} onViewPatient={setViewPatient}
                            onAddPatient={setAddPatient} current_token={props.current_token} titles={titlesPatient}
                            roleUser={props.roleUser} idUser={props.idUser}/>}
            {addPatient && <h1>Create patient</h1>}
            {addPatient && <AddPatient patient={patient} onAddPatient={setAddPatient}
                                 current_token={props.current_token}/>}
            {viewPatient && <CardPatient patient={patient} roleUser={props.roleUser} onViewPatient={setViewPatient}
                                     current_token={props.current_token}/>}


        </div>
    );
}

export default Patients;
