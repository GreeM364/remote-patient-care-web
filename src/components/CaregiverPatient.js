import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../css/main.css"
import BasicTable from "./BasicTable";
import CardCaregiver from "./CardCaregiver";
import AddCaregiverPatient from "./AddCaregiverPatient";


function Hospitals(props) {
    const titlesPatient = ["FullName", "Phone", "Email", "BirthDay"];
    const [addCaregiverPatient, setAddCaregiverPatient] = useState(false);
    const [caregiverPatient, setCaregiverPatient] = useState("")
    const [viewCaregiverPatient, setViewCaregiverPatient] = useState(false)




    return (
        <div className="Hospitals">
            {!addCaregiverPatient && !viewCaregiverPatient && <h1>CaregiverPatients</h1>}
            {!addCaregiverPatient && !viewCaregiverPatient && <Button onClick={setAddCaregiverPatient}  className="add"
                                                                      variant="contained"><AddCircleOutlineIcon/> Add new caregiverPatient</Button>}
            {!addCaregiverPatient && !viewCaregiverPatient && <BasicTable page={'caregiverPatients'} current_token={props.current_token}
                                                                          onCaregiverPatient={setCaregiverPatient}
                                                          titles={titlesPatient} onViewCaregiverPatient={setViewCaregiverPatient}
                                                                          onAddCaregiverPatient={setAddCaregiverPatient} roleUser={props.roleUser}/>}
            {addCaregiverPatient && <h1>Create CaregiverPatient</h1>}
            {addCaregiverPatient && <AddCaregiverPatient caregiverPatient={caregiverPatient} onAddCaregiverPatient={setAddCaregiverPatient} current_token={props.current_token}/>}
            {viewCaregiverPatient && <CardCaregiver caregiverPatient={caregiverPatient} onViewCaregiverPatient={setViewCaregiverPatient}
                                           current_token={props.current_token}/>}

        </div>
    );
}

export default Hospitals;
