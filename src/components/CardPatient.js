import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import admin from '../images/admin.png';
import TextField from '@mui/material/TextField';
import "../css/form.css"
import { ListBox } from 'primereact/listbox';
import Form1 from "./Form1";

export default function CardAdmin(props) {

    const getPatient = () => {
        fetch(`https://localhost:7070/api/Patient/${props.patient}`, {
            method: "GET",
            headers: { "Authorization": "Bearer " + props.current_token },
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res.result);
                setUser(res.result);
                setBirthDay(res.result.birthDate.split("T")[0]);
                getHospital(res.result.hospitalId);
                getDoctor(res.result.doctorId);
                getCaregiverPatient(res.result.caregiverPatientId);
                getPatientCriticalCondition();
                getPatientPhysicalCondition();
            });
    }

    useEffect(() => {
        getPatient();
    }, []);

    const getPatientCriticalCondition = () => {
        if (props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient") {
            fetch(`https://localhost:7070/api/CriticalСondition/${props.patient}/patient`, {
                method: "GET",
                headers: {
                    "accept": "text/plain",
                    "Authorization": "Bearer " + props.current_token
                },
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res.result);
                    setCriticalСondition(res.result);
                });
        }
    }

    const getPatientPhysicalCondition = () => {
        if (props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient") {
            fetch(`https://localhost:7070/api/PhysicalCondition/${props.patient}/patient`, {
                method: "GET",
                headers: {
                    "accept": "text/plain",
                    "Authorization": "Bearer " + props.current_token
                },
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res.result[0]);
                    setPhysicalCondition(res.result[0]);
                });
        }
    }

    const getHospital = (e) => {
        fetch(`https://localhost:7070/api/Hospital/${e}`, {
            method: "GET",
            headers: { "Authorization": "Bearer " + props.current_token },
        })
            .then(res => res.json())
            .then((res) => {
                setHospitalName(res.result.name);
            });
    }

    const getDoctor = (e) => {
        if (e != null) {
            fetch(`https://localhost:7070/api/Doctor/${e}`, {
                method: "GET",
                headers: { "Authorization": "Bearer " + props.current_token },
            })
                .then(res => res.json())
                .then((res) => {
                    const doctor = res.result;
                    setDoctorName(doctor.firstName + " " + doctor.lastName);
                });
        }
    }

    const getCaregiverPatient = (e) => {
        if (e != null) {
            fetch(`https://localhost:7070/api/CaregiverPatient/${e}`, {
                method: "GET",
                headers: { "Authorization": "Bearer " + props.current_token },
            })
                .then(res => res.json())
                .then((res) => {
                    const caregiverPatient = res.result;
                    setCaregiverPatientName(caregiverPatient.firstName + " " + caregiverPatient.lastName);
                });
        }
    }

    const [user, setUser] = useState([]);
    const [criticalСondition, setCriticalСondition] = useState([]);
    const [physicalCondition, setPhysicalCondition] = useState([]);
    const [birthDay, setBirthDay] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [caregiverPatientName, setCaregiverPatientName] = useState("");

    return (
        <Card sx={{ maxWidth: '100%', height: "90vh", overflow: 'auto' }}>
            <CardActionArea sx={{ width: "100%", minHeight: "85vh", display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignContent: "center" }}>
                {(criticalСondition.length === 0 || physicalCondition === undefined) && (
                    <CardMedia
                        component="img"
                        height="200"
                        style={{ width: '200px', margin: "50px 100px 0px 0px" }}
                        image={admin}
                        alt="green iguana"
                    />
                )}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{ margin: "0px 50px" }}>
                        {user.firstName + " " + user.lastName + " " + user.patronymic}
                    </Typography>
                    {(criticalСondition.length === 0 || physicalCondition === undefined) && (
                        <Typography className="typography" variant="body2" color="text.secondary" sx={{ width: "100%", height: "30vh", display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                            <TextField className="field" disabled id="outlined-disabled" label="Email" value={user.email} />
                            <TextField className="field" disabled id="outlined-disabled" label="Phone" value={user.phone} />
                            <TextField className="field" disabled id="outlined-disabled" label="Birth Day" value={birthDay} />
                            <TextField className="field" disabled id="outlined-disabled" label="Doctor Name" value={hospitalName} />
                            <TextField className="field" disabled id="outlined-disabled" label="Birth Day" value={doctorName} />
                            <TextField className="field" disabled id="outlined-disabled" label="Caregiver Patient Name" value={caregiverPatientName} />
                        </Typography>
                    )}

                    {(criticalСondition.length !== 0 && physicalCondition !== undefined) && (
                        <Typography className="typography" variant="body2" color="text.secondary" sx={{ width: "100%", height: "80vh", display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                            <TextField className="field" disabled id="outlined-disabled" label="Email" value={user.email} />
                            <TextField className="field" disabled id="outlined-disabled" label="Phone" value={user.phone} />
                            <TextField className="field" disabled id="outlined-disabled" label="Birth Day" value={birthDay} />
                            <TextField className="field" disabled id="outlined-disabled" label="Hospital Name" value={hospitalName} />
                            <TextField className="field" disabled id="outlined-disabled" label="Doctor Name" value={doctorName} />
                            <TextField className="field" disabled id="outlined-disabled" label="Caregiver Patient Name" value={caregiverPatientName} />
                            {criticalСondition.length !== 0 && (
                                <div className="criticalCondition">
                                    {criticalСondition.slice(-2).map((item) => (
                                        <TextField
                                            key={item.time}
                                            className="field"
                                            disabled
                                            id="outlined-disabled"
                                            label={item.time.split(".")[0]}
                                            value={item.message}
                                        />
                                    ))}
                                </div>
                            )}

                            {physicalCondition !== undefined && (
                                <div className="physicalCondition">
                                    <TextField className="field" disabled id="outlined-disabled" label="Time" value={physicalCondition.time} />
                                    <TextField className="field" disabled id="outlined-disabled" label="Pulse" value={physicalCondition.pulse} />
                                    <TextField className="field" disabled id="outlined-disabled" label="UpperArterialPressure" value={physicalCondition.upperArterialPressure} />
                                    <TextField className="field" disabled id="outlined-disabled" label="LowerArterialPressure" value={physicalCondition.lowerArterialPressure} />
                                    <TextField className="field" disabled id="outlined-disabled" label="BodyTemperature" value={physicalCondition.bodyTemperature} />
                                    <TextField className="field" disabled id="outlined-disabled" label="breathingRate" value={physicalCondition.breathingRate} />
                                </div>
                            )}
                        </Typography>
                    )}
                </CardContent>
                <Form1 patientId={props.patient} />
            </CardActionArea>
        </Card>
    );
}
