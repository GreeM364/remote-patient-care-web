import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import "../css/form.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddNew(props) {
    const getHospitalAdmin =(e) =>{
        if(props.hospitalAdmin !== "") {
            fetch(`https://localhost:7070/api/CaregiverPatient/${props.caregiverPatient}`, {
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
                    }
                )
        }
    }
    useEffect(() => {
        getHospitalAdmin();
    }, []);
    const AddHostipalAdmin = (e) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && patronymic !== "") {
            const user = { firstName: firstName, lastName: lastName, patronymic: patronymic,
                phone: phone, email: email, password: password, birthDate: birthDateFull};
            fetch("https://localhost:7070/api/CaregiverPatient", {
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
            props.onAddCaregiverPatient(false)
        }
    };
    const EditHostipalAdmin = (e) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && patronymic !== "") {
            const user = { firstName: firstName, lastName: lastName, patronymic: patronymic,
                phone: phone, email: email, password: password, birthDate: birthDateFull};
            fetch(`https://localhost:7070/api/CaregiverPatient/${props.caregiverPatient}`, {
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
            if(props.account){
                props.onViewCaregiverPatient(true)
            }
            props.onAddCaregiverPatient(false)
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
                <TextField className="input" id="outlined-basic" label="First Name" variant="outlined"
                           value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="Last Name" variant="outlined"
                           value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="Patronymic" variant="outlined"
                           value={patronymic} onChange={(e)=> setPatronymic(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="Phone" variant="outlined"
                           value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                <TextField className="input" id="outlined-basic" label="Email" variant="outlined"
                           value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <LocalizationProvider className="input" dateAdapter={AdapterDayjs}>
                    <DatePicker value={birthDate}
                                onChange={handleDateChange} />
                </LocalizationProvider>
                {props.caregiverPatient === "" && <TextField className="input" id="outlined-basic" label="password" variant="outlined"
                                                          value={password} onChange={(e)=> setPassword(e.target.value)}/>}
                {props.caregiverPatient === "" ? <Button className="register" variant="contained" onClick={AddHostipalAdmin}>Register</Button>
                    : <Button className="register" variant="contained" onClick={EditHostipalAdmin}>Change</Button>}
            </form>

        </div>
    );
}

export default AddNew;
