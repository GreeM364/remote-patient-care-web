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

function AddNew(props) {
    const { t } = useTranslation();
    const getHospitals =(e) =>{
        fetch(`https://localhost:7070/api/Hospital`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    setHospitals(res.result);
                }
            )
    }
    useEffect(() => {
        getHospitals();
    }, []);
    const getDocotors =(e) =>{
        fetch(`https://localhost:7070/api/Doctor`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    setDoctors(res.result);
                }
            )
    }
    useEffect(() => {
        getDocotors();
    }, []);
    const getCaregiverPatients =(e) =>{
        fetch(`https://localhost:7070/api/CaregiverPatient`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    setCaregiverPatients(res.result);
                }
            )
    }
    useEffect(() => {
        getCaregiverPatients();
    }, []);
    const getPatient =(e) =>{
        if(props.patient !== "") {
            fetch(`https://localhost:7070/api/Patient/${props.patient}`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        const admin = res.result
                        setFirstName(admin.firstName)
                        setLastName(admin.lastName)
                        setPatronymic(admin.patronymic)
                        setEmail(admin.email)
                        setPhone(admin.phone)
                        setBirthDateFull(admin.birthDate)
                        setHospitalId(admin.hospitalId)
                        getHospital(admin.hospitalId);
                        getDoctor(admin.doctorId);
                        getCaregiverPatient(admin.caregiverPatientId);

                    }
                )
        }
    }
    useEffect(() => {
        getPatient();
    }, []);
    const getHospital =(e) =>{
        fetch(`https://localhost:7070/api/Hospital/${e}`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    const hospital = res.result
                    setHospitalName(hospital.name)

                }
            )


    }
    const getDoctor =(e) =>{

        fetch(`https://localhost:7070/api/Doctor/${e}`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    console.log(res.result)
                    const hospital = res.result
                    setDoctorName(hospital.firstName + " " + hospital.lastName)

                }
            )
    }
    const getCaregiverPatient =(e) =>{
        fetch(`https://localhost:7070/api/CaregiverPatient/${e}`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    const hospital = res.result
                    console.log(e)
                    setCaregiverPatientName(hospital.firstName + " " + hospital.lastName)

                }
            )


    }
    const [hospitals, setHospitals] = useState([])
    const [doctors, setDoctors] = useState([])
    const [caregiverPatients, setCaregiverPatients] = useState([])
    const AddPatient = (e) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && patronymic !== "") {
            let user = {}
            if(caregiverPatientId === "" || doctorId ==="")
                user = { firstName: firstName, lastName: lastName, patronymic: patronymic,
                    phone: phone, email: email, password: password, birthDate: birthDateFull, hospitalId: hospitalId};
            else
                user = { firstName: firstName, lastName: lastName, patronymic: patronymic,
                phone: phone, email: email, password: password, birthDate: birthDateFull, hospitalId: hospitalId,
                doctorId: doctorId, caregiverPatientId: caregiverPatientId};
            fetch("https://localhost:7070/api/Patient", {
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
            props.onAddPatient(false)
        }
    };
    const EditPatient = (e) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && patronymic !== "") {
            const user = { firstName: firstName, lastName: lastName, patronymic: patronymic,
                phone: phone, email: email, password: password, birthDate: birthDateFull, hospitalId: hospitalId,
                doctorId: doctorId, caregiverPatientId: caregiverPatientId};
            fetch(`https://localhost:7070/api/Patient/${props.patient}`, {
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
            props.onAddPatient(false)
        }
    };
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [birthDateFull, setBirthDateFull] = useState("")
    const [password, setPassword] = useState("")
    const [hospitalId, setHospitalId] = useState("")
    const [hospitalName, setHospitalName] = useState("")
    const [doctorId, setDoctorId] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [caregiverPatientId, setCaregiverPatientId] = useState("")
    const [caregiverPatientName, setCaregiverPatientName] = useState("")
    const handleDateChange = (date) => {
        console.log(date)
        const month = "" + date.$M;
        const day = "" + date.$D;
        let dateObj = date.$y + "-";
        if(month.length == 1)
            dateObj += "0" + date.$M + "-"
        else
            dateObj += date.$M + "-"
        if(day.length == 1)
            dateObj += "0" + date.$D
        else
            dateObj += date.$D
        setBirthDateFull(dateObj)
        setBirthDate(date);
    };




    return (
        <div className="AddNew">
            <form className="addNewHospitalAdmin">
                <TextField className="input" id="outlined-basic" label={t("firstName")} variant="outlined"
                           value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("lastName")} variant="outlined"
                           value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("patronymic")} variant="outlined"
                           value={patronymic} onChange={(e)=> setPatronymic(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("phone")} variant="outlined"
                           value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label={t("email")} variant="outlined"
                           value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <LocalizationProvider className="input" dateAdapter={AdapterDayjs}>
                    <DatePicker value={birthDate}
                                onChange={handleDateChange} />
                </LocalizationProvider>
                {props.patient === "" && <TextField className="input" id="outlined-basic" label={t("password")} variant="outlined"
                                                          value={password} onChange={(e)=> setPassword(e.target.value)}/>}
                <TextField  className="input"
                            id="outlined-select-currency"
                            select
                            label={hospitalName}
                            helperText={t("selectHospital")}
                            defaultChecked={hospitalId}
                >
                    {hospitals.map((option) => (
                        <MenuItem key={option.id} onClick={()=> setHospitalId(option.id)} value={<option value="" className="id"></option>}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField  className="input"
                            id="outlined-select-currency"
                            select
                            label={doctorName}
                            helperText={t("selectDoctor")}
                            defaultChecked={doctorId}
                >
                    {doctors.map((option) => (
                        <MenuItem key={option.id} onClick={()=> setDoctorId(option.id)} value={<option value="" className="id"></option>}>
                            {option.firstName} {option.lastName}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField  className="input"
                            id="outlined-select-currency"
                            select
                            label={caregiverPatientName}
                            helperText={t("selectCaregiver")}
                            defaultChecked={caregiverPatientId}
                >
                    {caregiverPatients.map((option) => (
                        <MenuItem key={option.id} onClick={()=> setCaregiverPatientId(option.id)} value={<option value="" className="id"></option>}>
                            {option.firstName} {option.lastName}
                        </MenuItem>
                    ))}
                </TextField>
                {props.patient === "" ? <Button className="register" variant="contained" onClick={AddPatient}>{t('register')}</Button>
                    : <Button className="register" variant="contained" onClick={EditPatient}>{t('change')}</Button>}
            </form>

        </div>
    );
}

export default AddNew;
