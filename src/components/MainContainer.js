import React, {useEffect, useState} from 'react';
import Menu from "./Menu";
import Header from "./Header.";
import "../css/main.css"
import Accounts from "./Accounts";
import Hospitals from "./Hospitals";
import Patients from "./Patients";
import AddPatientsToDoctor from "./AddPatientsToDoctor";
import CaregiverPatient from "./CaregiverPatient";
import CardAdmin from "./CardAdmin";
import AddNew from "./AddNew";
import CardDocotr from "./CardDoctor";
import AddDoctor from "./AddDoctor";
import AddCaregiverPatient from "./AddCaregiverPatient";
import CardCaregiver from "./CardCaregiver";
import Payments from "./Payments";

function MainContainer(props) {
    const getChoose =(e) =>{
        if(props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient")
            setChoose("patients")
    }

    const handleSearchQueryChange = (query) => {
        console.log("Input main: ", query)
        setSearchQuery(query);
    };

    useEffect(() => {
        getChoose();
    }, []);

    const [choose, setChoose] = useState("accounts");
    const[view, setView] = useState(false)
    const[add, setAdd] = useState(false)
    const[id, setId] = useState("")
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="MainContainer">
            <Menu setChoose={setChoose} roleUser={props.roleUser} choose={choose} onLog={props.onLog}/>
            <div class="mainDiv">
                <Header nameUser={props.nameUser} choose={choose} roleUser={props.roleUser} onView={setView} onSearchQueryChange={handleSearchQueryChange}/>
                <hr width="90%"/>
                {choose === "accounts" && !view && !add &&
                    <Accounts current_token={props.current_token} roleUser={props.roleUser}/>}
                {choose === "hospitals" && !view && !add &&
                    <Hospitals current_token={props.current_token} roleUser={props.roleUser}/>}
                {choose === "caregiverPatients" && !view && !add &&
                    <CaregiverPatient current_token={props.current_token} roleUser={props.roleUser}/>}
                {choose === "patients" && !view && !add &&
                    <Patients current_token={props.current_token} idUser={props.idUser} roleUser={props.roleUser} searchQuery={searchQuery}/>}
                {choose === "addPatients" && !view && !add &&
                    <AddPatientsToDoctor current_token={props.current_token} idUser={props.idUser} roleUser={props.roleUser}/>}
                {choose === "payments" && !view && !add &&
                    <Payments current_token={props.current_token} idUser={props.idUser} roleUser={props.roleUser}/>}
                {view && !add && props.roleUser === "HospitalAdministrator" && <CardAdmin onId={setId} onAddAdmin={setAdd} account={true} hospitalAdmin={props.idUser}
                                                                                  onViewAdmin={setView}
                                                                                  current_token={props.current_token}/>}

                {view && !add && props.roleUser === "Doctor" && <CardDocotr onId={setId} onAddDoctor={setAdd} account={true} doctor={props.idUser}
                                                                           onViewDoctor={setView} current_token={props.current_token}/>}

                {add && !view && props.roleUser === "HospitalAdministrator" && <AddNew account={true} onAddAdmin={setAdd} hospitalAdmin={id}
                                                                                       onViewAdmin={setView}
                                                                                  current_token={props.current_token}/>}
                {add && !view && props.roleUser === "Doctor" && <AddDoctor account={true} onAddDoctor={setAdd} doctor={id}
                                                                            onViewDoctor={setView}
                                                                                       current_token={props.current_token}/>}
                {view && !add && props.roleUser === "CaregiverPatient" && <CardCaregiver onId={setId} account={true} onAddCaregiverPatient={setAdd}
                                                                                         caregiverPatient={id}
                                                                                              onViewCaregiverPatient={setView}
                                                                                       current_token={props.current_token}/>}
                {add && !view && props.roleUser === "CaregiverPatient" && <AddCaregiverPatient account={true} onAddCaregiverPatient={setAdd}
                                                                                               caregiverPatient={id}
                                                                                     onViewCaregiverPatient={setView}
                                                                           current_token={props.current_token}/>}

            </div>
        </div>
    );
}

export default MainContainer;
