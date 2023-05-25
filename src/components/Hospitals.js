import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../css/main.css"
import BasicTable from "./BasicTable";
import AddHospital from "./AddHospital";
import CardAdmin from "./CardAdmin";
import CardHospital from "./CardHospital";

function Hospitals(props) {
    const titlesGlobalAdmin = ["Address", "Name", "Data Subscribe", "DoctorsCount", "PatientsCount"];
    const [addHospital, setAddHospital] = useState(false);
    const [hospital, setHospital] = useState("")
    const [viewHospital, setViewHospital] = useState(false)




    return (
        <div className="Hospitals">
            {!addHospital && !viewHospital && <h1>Hospitals</h1>}
            {!addHospital && !viewHospital && <Button onClick={setAddHospital}  className="add" variant="contained"><AddCircleOutlineIcon/> Add new hospital</Button>}
            {!addHospital && !viewHospital && <BasicTable page={'hospitals'} current_token={props.current_token} onHId={setHospital}
                                                          titles={titlesGlobalAdmin} onViewHospital={setViewHospital} onHospital={setAddHospital} roleUser={props.roleUser}/>}
            {addHospital && <h1>Create hospital</h1>}
            {addHospital && <AddHospital hospitalId="" hospitalId={hospital} onHospital={setAddHospital} current_token={props.current_token}/>}
            {viewHospital && <CardHospital hospital={hospital} onViewHospital={setViewHospital}
                                     current_token={props.current_token}/>}

        </div>
    );
}

export default Hospitals;
