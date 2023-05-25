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

export default function CardAdmin( props) {

    const getHospitalAdmin =(e) =>{
        fetch(`https://localhost:7070/api/HospitalAdministrator/${props.hospitalAdmin}`, {
            method: "GET",
            headers: {"Authorization": "Bearer " + props.current_token},
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res.result)
                setUser(res.result)
                setBirthDay(res.result.birthDate.split("T")[0])
                getHospital(res.result.hospitalId)

                }
            )
    }
    useEffect(() => {
        getHospitalAdmin();
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
    const [user, setUser] = useState([])
    const [birthDay, setBirthDay] = useState("")
    const [hospitalName, setHospitlName] = useState("")
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
                    />
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => props.onViewAdmin(false)}>
                    Close
                </Button>
            </CardActions>
        </Card>
    );
}
