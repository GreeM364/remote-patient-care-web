import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import admin from '../images/admin.png';
import TextField from '@mui/material/TextField';
import "../css/form.css"

export default function CardDocotr( props) {

    const getDoctor =(e) =>{
        if(props.account) {
            fetch(`https://localhost:7070/api/User/profile`, {
                method: "GET",
                headers: {'accept': "*/*", "Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result.doctor)
                        setUser(res.result.doctor)
                        setBirthDay(res.result.doctor.birthDate.split("T")[0])
                        let begginingWorkingDay = res.result.doctor.beginningWorkingDay.split("T")[1].split(".")[0].split(":")
                        let endWorkingDay = res.result.doctor.endWorkingDay.split("T")[1].split(".")[0].split(":")
                        setBegginingDay(begginingWorkingDay[0] + ":" + begginingWorkingDay[1])
                        setEndDay(endWorkingDay[0] + ":" + endWorkingDay[1])
                        getHospital(res.result.doctor.hospitalId)


                    }
                )
        }else {
            fetch(`https://localhost:7070/api/Doctor/${props.doctor}`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result)
                        setUser(res.result)
                        setBirthDay(res.result.birthDate.split("T")[0])
                        let begginingWorkingDay = res.result.beginningWorkingDay.split("T")[1].split(".")[0].split(":")
                        let endWorkingDay = res.result.endWorkingDay.split("T")[1].split(".")[0].split(":")
                        setBegginingDay(begginingWorkingDay[0] + ":" + begginingWorkingDay[1])
                        setEndDay(endWorkingDay[0] + ":" + endWorkingDay[1])
                        getHospital(res.result.hospitalId)

                    }
                )
        }
    }
    useEffect(() => {
        getDoctor();
    }, []);
    const getHospital =(e) =>{
        fetch(`https://localhost:7070/api/Hospital/${e}`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                    setHospitlName(res.result.name)
                }
            )
    }
    const Edit = () => {
        props.onViewDoctor(false)
        props.onAddDoctor(true)
        props.onId(user.id)
    }
    const [user, setUser] = useState([])
    const [birthDay, setBirthDay] = useState("")
    const [hospitalName, setHospitlName] = useState("")
    const [begginingDay, setBegginingDay] = useState("")
    const [endDay, setEndDay] = useState("")
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    style={{ width: '250px', margin: "0px 50px" }}
                    image={admin}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{margin: "0px 50px"}}>
                        {user.firstName + " " + user.lastName + " " + user.patronymic}
                    </Typography>
                    <Typography className="typography" variant="body2" color="text.secondary">
                        <TextField className="field"
                            disabled
                            id="outlined-disabled"
                            label="Email" value={user.email}
                        /><TextField className="field"
                        disabled
                        id="outlined-disabled"
                        label="Phone" value={user.phone}
                    /><TextField className="field"
                        disabled
                        id="outlined-disabled"
                        label="Birth Day" value={birthDay}
                    /><TextField className="field"
                        disabled
                        id="outlined-disabled"
                        label="Hospital Name" value={hospitalName}
                    /><TextField className="field"
                                 disabled
                                 id="outlined-disabled"
                                 label="Beginning Working Day" value={begginingDay}
                    /><TextField className="field"
                                 disabled
                                 id="outlined-disabled"
                                 label="End Working Name" value={endDay}
                    />
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {props.account && <Button size="small" color="primary" onClick={Edit}>
                    Edit
                </Button>}
                <Button size="small" color="primary" onClick={() => props.onViewDoctor(false)}>
                    Close
                </Button>
            </CardActions>
        </Card>
    );
}
