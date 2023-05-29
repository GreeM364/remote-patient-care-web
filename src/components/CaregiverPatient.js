import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../css/main.css"
import BasicTable from "./BasicTable";
import CardCaregiver from "./CardCaregiver";
import AddCaregiverPatient from "./AddCaregiverPatient";
import { useTranslation } from 'react-i18next';


function Hospitals(props) {
    const { t } = useTranslation()
    const titlesPatient = [t('fullName'), t('phone'), t('email'), t('birthDay')];
    const [addCaregiverPatient, setAddCaregiverPatient] = useState(false);
    const [caregiverPatient, setCaregiverPatient] = useState("")
    const [viewCaregiverPatient, setViewCaregiverPatient] = useState(false)




    return (
        <div className="Hospitals">
            {!addCaregiverPatient && !viewCaregiverPatient && <h1>{t("caregiverPatients")}</h1>}
            {!addCaregiverPatient && !viewCaregiverPatient && <Button onClick={setAddCaregiverPatient}  className="add"
                                                                      variant="contained"><AddCircleOutlineIcon/> {t("addNewCaregiver")}</Button>}
            {!addCaregiverPatient && !viewCaregiverPatient && <BasicTable page={'caregiverPatients'} current_token={props.current_token}
                                                                          onCaregiverPatient={setCaregiverPatient}
                                                          titles={titlesPatient} onViewCaregiverPatient={setViewCaregiverPatient}
                                                                          onAddCaregiverPatient={setAddCaregiverPatient} roleUser={props.roleUser}/>}
            {addCaregiverPatient && <h1>{t("createCaregiverPatient")}</h1>}
            {addCaregiverPatient && <AddCaregiverPatient caregiverPatient={caregiverPatient} onAddCaregiverPatient={setAddCaregiverPatient} current_token={props.current_token}/>}
            {viewCaregiverPatient && <CardCaregiver caregiverPatient={caregiverPatient} onViewCaregiverPatient={setViewCaregiverPatient}
                                           current_token={props.current_token}/>}

        </div>
    );
}

export default Hospitals;
