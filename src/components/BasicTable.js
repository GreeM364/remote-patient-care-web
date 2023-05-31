import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SortIcon from '@mui/icons-material/Sort';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "../css/main.css"

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ActionsTable from "./ActionsTable";
import {useTranslation} from "react-i18next";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        align: "center",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export default function BasicTable(props) {
    const [data, setData] = useState([])
    const [doctor, setDoctor] = useState("")
    const [caregiver, setCaregiver] = useState("");
    const { t } = useTranslation();
    console.log("Input table: ", props.searchQuery)
    const getData =(e) =>{
        if (props.page === "accounts" && props.roleUser === "GlobalAdmin") {
            fetch(`https://localhost:7070/api/HospitalAdministrator`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        setData(res.result);
                    }
                )
        }
        else if(props.page === "hospitals" && props.roleUser === "GlobalAdmin"){
            fetch(`https://localhost:7070/api/Hospital`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        setData(res.result);
                    }
                )
        }
        else if (props.page === "accounts" && props.roleUser === "HospitalAdministrator") {
            fetch(`https://localhost:7070/api/Doctor`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result)
                        setData(res.result);
                    }
                )
        }
        else if(props.page === "patients" && props.roleUser === "HospitalAdministrator"){
            fetch(`https://localhost:7070/api/Patient`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result)
                        setData(res.result);
                    }
                )
        }
        else if(props.page === "patients" && props.roleUser === "Doctor"){
            fetch(`https://localhost:7070/api/Doctor/${props.idUser}/patients`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result)
                        setData(res.result);
                    }
                )
        }
        else if(props.page === "caregiverPatients" && props.roleUser === "HospitalAdministrator"){
            fetch(`https://localhost:7070/api/CaregiverPatient`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result)
                        setData(res.result);
                    }
                )
        }
        else if(props.page === "patients" && props.roleUser === "CaregiverPatient"){
            fetch(`https://localhost:7070/api/CaregiverPatient/${props.idUser}/patients`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + props.current_token},
            })
                .then(res => res.json())
                .then((res) => {
                        console.log(res.result)
                        setData(res.result);
                    }
                )
        }
    }
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        data.forEach((row) => {
            if (row.doctorId != null) {
                fetch(`https://localhost:7070/api/Doctor/${row.doctorId}`, {
                    method: "GET",
                    headers: { "Authorization": "Bearer " + props.current_token },
                })
                    .then((res) => res.json())
                    .then((res) => {
                        const doctorObj = res.result;
                        console.log(doctorObj);
                        setDoctor((prevDoctor) => ({
                            ...prevDoctor,
                            [row.id]: doctorObj.firstName + " " + doctorObj.lastName,
                        }));
                    });
            } else {
                setDoctor((prevDoctor) => ({
                    ...prevDoctor,
                    [row.id]: "------------------",
                }));
            }
            if (row.caregiverPatientId != null) {
                fetch(`https://localhost:7070/api/CaregiverPatient/${row.caregiverPatientId}`, {
                    method: "GET",
                    headers: { "Authorization": "Bearer " + props.current_token },
                })
                    .then((res) => res.json())
                    .then((res) => {
                        const caregiverObj = res.result;
                        console.log(caregiverObj);
                        setCaregiver((prevCaregiver) => ({
                            ...prevCaregiver,
                            [row.id]: caregiverObj.firstName + " " + caregiverObj.lastName,
                        }));
                    });
            } else {
                setCaregiver((prevCaregiver) => ({
                    ...prevCaregiver,
                    [row.id]: "------------------",
                }));
            }
        });
    }, [data]);

    const filteredData = data.filter((row) => {
        const fullName = `${row.firstName} ${row.lastName}`;
        const email = row.email;
        const searchQuery = props.searchQuery?.toLowerCase() || '';

        return (
            fullName.toLowerCase().includes(searchQuery) ||
            email.toLowerCase().includes(searchQuery)
        );
    });


    return (
        <TableContainer className="TableBasic" component={Paper}>
            {props.page === "accounts" && props.roleUser === "GlobalAdmin" &&
                <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                    <TableHead>
                        <TableRow
                            key={props.titles[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {props.titles.map((title) => (

                                <StyledTableCell align="center" component="th" scope="row">
                                    {title} <SortIcon/>
                                </StyledTableCell>

                            ))}
                            <StyledTableCell component="th" scope="row">

                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row.firstName} {row.lastName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.hospitalId}</StyledTableCell>
                                <StyledTableCell align="center"><ActionsTable onHospitalAdmin={props.onHospitalAdmin} onViewAdmin={props.onViewAdmin}
                                                                            current_token={props.current_token}
                                                                            page={props.page} role={props.roleUser}
                                                                            onAddAdmin={props.onAddAdmin} hospitalAdminId={row.id}/></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            }
            {props.page === "hospitals" && props.roleUser === "GlobalAdmin" && <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                <TableHead>
                    <TableRow
                        key={props.titles[0]}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {props.titles.map((title) => (

                            <StyledTableCell component="th" align="center" scope="row">
                                {title} <SortIcon/>
                            </StyledTableCell>

                        ))}
                        <StyledTableCell component="th" scope="row">

                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell align="center" component="th" scope="row">
                                {row.address}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.dataPaySubscription.split("T")[0]}</StyledTableCell>
                            <StyledTableCell align="center">{row.doctorsCount}</StyledTableCell>
                            <StyledTableCell align="center">{row.patientsCount}</StyledTableCell>
                            <StyledTableCell align="center"><ActionsTable current_token={props.current_token} onHId={props.onHId}
                                                                        page={props.page} role={props.roleUser} onViewHospital={props.onViewHospital}
                                                                        onHospital={props.onHospital} hospitalId={row.id}/></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>}
            {props.page === "accounts" && props.roleUser === "HospitalAdministrator" &&
                <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                    <TableHead>
                        <TableRow
                            key={props.titles[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {props.titles.map((title) => (

                                <StyledTableCell align="center" component="th" scope="row">
                                    {title} <SortIcon/>
                                </StyledTableCell>

                            ))}
                            <StyledTableCell component="th" scope="row">

                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row.firstName} {row.lastName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.beginningWorkingDay.split("T")[1].split(".")[0]}
                                    /{row.endWorkingDay.split("T")[1].split(".")[0]}</StyledTableCell>

                                <StyledTableCell align="center"><ActionsTable onDoctor={props.onDoctor} onViewDoctor={props.onViewDoctor}
                                                                            current_token={props.current_token}
                                                                            page={props.page} role={props.roleUser}
                                                                            onAddDoctor={props.onAddDoctor} doctorId={row.id}/></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            }
            {props.page === "patients" && props.roleUser === "HospitalAdministrator" &&
                <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                    <TableHead>
                        <TableRow
                            key={props.titles[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {props.titles.map((title) => (

                                <StyledTableCell align="center" component="th" scope="row">
                                    {title} <SortIcon/>
                                </StyledTableCell>

                            ))}
                            <StyledTableCell component="th" scope="row">

                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row.firstName} {row.lastName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{caregiver[row.id]}</StyledTableCell>
                                <StyledTableCell align="center">{doctor[row.id]}</StyledTableCell>

                                <StyledTableCell align="center"><ActionsTable onPatient={props.onPatient} onViewPatient={props.onViewPatient}
                                                                            current_token={props.current_token}
                                                                            page={props.page} role={props.roleUser}
                                                                            onAddPatient={props.onAddPatient} patientId={row.id}/></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            }
            {((props.page === "patients" &&  (props.roleUser === "Doctor" || props.roleUser === "CaregiverPatient")) ||
                    props.page === "caregiverPatients" && props.roleUser === "HospitalAdministrator")  &&
                <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                    <TableHead>
                        <TableRow
                            key={props.titles[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {props.titles.map((title) => (

                                <StyledTableCell align="center" component="th" scope="row">
                                    {title} <SortIcon/>
                                </StyledTableCell>

                            ))}
                            <StyledTableCell component="th" scope="row">

                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row.firstName} {row.lastName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.birthDate.split("T")[0]}</StyledTableCell>

                                <StyledTableCell align="center"><ActionsTable onPatient={props.onPatient} onViewPatient={props.onViewPatient}
                                                                            onViewCaregiverPatient={props.onViewCaregiverPatient}
                                                                            onAddCaregiverPatient={props.onAddCaregiverPatient} onCaregiverPatient={props.onCaregiverPatient}
                                                                            current_token={props.current_token} idUser={props.idUser}
                                                                            page={props.page} role={props.roleUser}
                                                                            onAddPatient={props.onAddPatient} patientId={row.id}/></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            }
        </TableContainer>
    );
}
