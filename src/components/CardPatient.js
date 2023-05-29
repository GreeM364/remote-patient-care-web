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
import {useTranslation} from "react-i18next";

export default function CardAdmin(props) {
    const { t } = useTranslation();

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
                setEmail(res.result.email)
                setPhone(res.result.phone)
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
                    "accept": "application/json",
                    "Authorization": "Bearer " + props.current_token
                },
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res.result);

                    if (res.result.length > 0) {
                        const sortedRecords = res.result.sort((a, b) => {
                            return new Date(a.time) - new Date(b.time);
                        });
                        console.log("Sorted Records:", sortedRecords);

                        const latestPhysicalCondition = sortedRecords[sortedRecords.length - 1];
                        const latestTimestamp = latestPhysicalCondition.time;
                        console.log("Latest Timestamp:", latestTimestamp);

                        // setPhysicalCondition(latestPhysicalCondition);
                        setTime(latestPhysicalCondition.time)
                        setPulse(latestPhysicalCondition.pulse)
                        setUpperArterialPressure(latestPhysicalCondition.upperArterialPressure)
                        setLowerArterialPressure(latestPhysicalCondition.lowerArterialPressure)
                        setBodyTemperature(latestPhysicalCondition.bodyTemperature)
                        setBreathingRate(latestPhysicalCondition.breathingRate)
                        console.log("latestPhysicalCondition: ", latestPhysicalCondition)
                    }
                });
        }
    };




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
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [time, setTime] = useState("")
    const [pulse, setPulse] = useState("")
    const [upperArterialPressure, setUpperArterialPressure] = useState("")
    const [lowerArterialPressure, setLowerArterialPressure] = useState("")
    const [bodyTemperature, setBodyTemperature] = useState("")
    const [breathingRate, setBreathingRate] = useState("")

    return (
        <Card sx={{ maxWidth: '100%', height: "90vh", overflow: 'auto' }}>
            <CardActionArea sx={{ width: "100%", minHeight: "85vh", display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignContent: "center" }}>

                <CardMedia
                    component="img"
                    height="250"
                    style={{ width: '250px', margin: "0px 50px" }}
                    image={admin}
                    alt="green iguana"
                />

                <CardContent>

                    <Typography gutterBottom variant="h5" component="div" style={{ margin: "0px 50px" }}>
                        {user.firstName + " " + user.lastName + " " + user.patronymic}
                    </Typography>

                        <Typography className="typography" variant="body2" color="text.secondary"
                                    sx={{
                                        width: "100%",
                                        height: "30vh",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-around",
                                        alignContent: "space-around",
                                        ...(props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient"
                                            ? { height: "60vh" }
                                            : {})
                                    }}>
                            <TextField className="field" disabled id="outlined-disabled" label={t('email')} value={email} />
                            <TextField className="field" disabled id="outlined-disabled" label={t('phone')} value={phone} />
                            <TextField className="field" disabled id="outlined-disabled" label={t('birthDay')} value={birthDay} />
                            <TextField className="field" disabled id="outlined-disabled" label={t("hospitalName")} value={hospitalName} />
                            <TextField className="field" disabled id="outlined-disabled" label={t('doctorName')} value={doctorName} />
                            <TextField className="field" disabled id="outlined-disabled" label={t("caregiverPatientName")} value={caregiverPatientName} />
                            {(props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient") &&(
                                <div className="physicalCondition">
                                <TextField className="field" disabled id="outlined-disabled" label={t("time")} value={time} />
                                <TextField className="field" disabled id="outlined-disabled" label={t("pulse")} value={pulse} />
                                <TextField className="field" disabled id="outlined-disabled" label={t("upperArterialPressure")} value={upperArterialPressure} />
                                <TextField className="field" disabled id="outlined-disabled" label={t("lowerArterialPressure")} value={lowerArterialPressure} />
                                <TextField className="field" disabled id="outlined-disabled" label={t("bodyTemperature")} value={bodyTemperature} />
                                <TextField className="field" disabled id="outlined-disabled" label={t("breathingRate")} value={breathingRate} />
                            </div>)}
                        </Typography>
                </CardContent>
                {(props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient") && <Form1 patientId={props.patient} />}
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => props.onViewPatient(false)}>
                    {t("close")}
                </Button>
            </CardActions>
        </Card>
    );
}
