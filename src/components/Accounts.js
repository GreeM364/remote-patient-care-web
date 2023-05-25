import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from "./Menu";
import Header from "./Header.";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../css/main.css"
import BasicTable from "./BasicTable";
import AddNew from "./AddNew";
import CardAdmin from "./CardAdmin";

function Accounts(props) {
    const titlesGlobalAdmin = ["FullName", "Phone", "Email", "HospitalName"];
    const titlesHospitalAdmin = ["FullName", "Phone", "Email", "BeginningWorkingDay/EndWorkingDay"];
    const [addAdmin, setAddAdmin] = useState(false);
    const [addDoctor, setAddDoctor] = useState(false);
    const [hospitalAdmin, setHospitalAdmin] = useState("")
    const [viewAdmin, setViewAdmin] = useState(false)
    const [viewDoctor, setViewDoctor] = useState(false)



    return (
        <div className="Accounts">
            {!addAdmin && !addDoctor && !viewDoctor && !viewAdmin && <h1>Accounts</h1>}
            {props.roleUser === "GlobalAdmin" && !addAdmin && !addDoctor && !viewDoctor && !viewAdmin &&
            <Button onClick={setAddAdmin} className="add" variant="contained"><AddCircleOutlineIcon/> Add new admin</Button>}
            {props.roleUser === "HospitalAdmin" && !addAdmin && !addDoctor && !viewDoctor && !viewAdmin &&
                <Button variant="contained"><AddCircleOutlineIcon/>Add new doctor</Button>}
            {props.roleUser === "GlobalAdmin" && !addAdmin && !addDoctor && !viewDoctor && !viewAdmin &&
                <BasicTable page="accounts" onHospitalAdmin={setHospitalAdmin} onViewAdmin={setViewAdmin}
                            onAddAdmin={setAddAdmin} current_token={props.current_token} titles={titlesGlobalAdmin}
                            roleUser={props.roleUser}/>}
            {props.roleUser === "HospitalAdmin" && !addAdmin && !addDoctor && !viewDoctor && !viewAdmin &&
                <BasicTable page="accounts" current_token={props.current_token} titles={titlesHospitalAdmin} roleUser={props.roleUser}/>}
            {addAdmin && <h1>Create hospital admin</h1>}
            {addAdmin && <AddNew hospitalAdmin={hospitalAdmin} onAddAdmin={setAddAdmin}
                                 current_token={props.current_token} onAddDoctor={setAddAdmin}/>}
            {viewAdmin && <CardAdmin hospitalAdmin={hospitalAdmin} onViewAdmin={setViewAdmin}
                                     current_token={props.current_token}/>}


        </div>
    );
}

export default Accounts;
