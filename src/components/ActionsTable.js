import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function ActionsTable(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const edit = () => {
        if(props.page === "accounts" && props.role === "GlobalAdmin") {
            props.onAddAdmin(true)
            props.onHospitalAdmin(props.hospitalAdminId)
        }
        else if(props.page === "hospitals" && props.role === "GlobalAdmin"){
            props.onHospital(true)
            props.onHId(props.hospitalId)
        }
        else if(props.page === "accounts" && props.role === "HospitalAdministrator"){
            props.onAddDoctor(true)
            props.onDoctor(props.doctorId)
        }
        else if(props.page === "caregiverPatients" && props.role === "HospitalAdministrator"){
            props.onAddCaregiverPatient(true)
            props.onCaregiverPatient(props.patientId)
        }
        else if(props.page === "patients" && props.role === "HospitalAdministrator"){

            props.onAddPatient(true)
            props.onPatient(props.patientId)
        }
        handleClose()
    }
    const view = () => {
        if(props.page === "accounts" && props.role === "GlobalAdmin") {
            props.onViewAdmin(true)
            props.onHospitalAdmin(props.hospitalAdminId)
        }
        else if(props.page === "hospitals" && props.role === "GlobalAdmin"){
            props.onViewHospital(true)
            props.onHId(props.hospitalId )
        }
        else if(props.page === "accounts" && props.role === "HospitalAdministrator"){
            props.onViewDoctor(true)
            props.onDoctor(props.doctorId)
        }
        else if(props.page === "caregiverPatients" && props.role === "HospitalAdministrator"){
            props.onViewCaregiverPatient(true)
            props.onCaregiverPatient(props.patientId)
        }
        else if(props.page === "patients" && (props.role === "HospitalAdministrator" || (props.role !== "Doctor" || props.role !== "CaregiverPatient"))){
            props.onViewPatient(true)
            props.onPatient(props.patientId)
        }
        handleClose()
    }
    const deleteHospitalAdmin = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7070/api/HospitalAdministrator/${props.hospitalAdminId}`, {
            method: "DELETE",
            headers: {"accept": "text/plain", "Authorization": "Bearer " + props.current_token},
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                handleClose();

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const deleteHospital = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7070/api/Hospital/${props.hospitalId}`, {
            method: "DELETE",
            headers: {"accept": "text/plain", "Authorization": "Bearer " + props.current_token},
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                handleClose();

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const deleteDoctor = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7070/api/Doctor/${props.doctorId}`, {
            method: "DELETE",
            headers: {"accept": "text/plain", "Authorization": "Bearer " + props.current_token},
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                handleClose();

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const deleteCaregiverPatients = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7070/api/CaregiverPatient/${props.patientId}`, {
            method: "DELETE",
            headers: {"accept": "text/plain", "Authorization": "Bearer " + props.current_token},
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                handleClose();

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const deletePatient = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7070/api/Patient/${props.patientId}`, {
            method: "DELETE",
            headers: {"accept": "text/plain", "Authorization": "Bearer " + props.current_token},
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                handleClose();

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const deletePatientToDoctor = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7070/api/Doctor/${props.patientId}/delete-patient`, {
            method: "PATCH",
            headers: {"accept": "text/plain", "Authorization": "Bearer " + props.current_token},
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                handleClose();

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const deletePatientToCaregiverPatient = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7070/api/CaregiverPatient/${props.patientId}/delete-patient`, {
            method: "PATCH",
            headers: {"accept": "text/plain", "Authorization": "Bearer " + props.current_token},
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                handleClose();

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="default"
                disableElevation
                onClick={handleClick}
                endIcon={<MoreHorizIcon />}
            />
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {(props.role !== "Doctor" && props.role !== "CaregiverPatient") && <MenuItem onClick={edit} disableRipple>
                    <EditIcon />
                    Change info
                </MenuItem>}
                <MenuItem onClick={view} disableRipple>
                    <VisibilityIcon />
                    View info
                </MenuItem>
                {props.page === "accounts" && props.role === "GlobalAdmin" &&
                    <MenuItem onClick={deleteHospitalAdmin} disableRipple>
                        <DeleteForeverIcon />
                        Delete
                    </MenuItem>
                }
                {props.page === "hospitals" && props.role === "GlobalAdmin" &&
                    <MenuItem onClick={deleteHospital} disableRipple>
                        <DeleteForeverIcon />
                        Delete
                    </MenuItem>
                }
                {props.page === "accounts" && props.role === "HospitalAdministrator" &&
                    <MenuItem onClick={deleteDoctor} disableRipple>
                        <DeleteForeverIcon />
                        Delete
                    </MenuItem>
                }
                {props.page === "patients" && props.role === "HospitalAdministrator" &&
                    <MenuItem onClick={deletePatient} disableRipple>
                        <DeleteForeverIcon />
                        Delete
                    </MenuItem>
                }
                {props.page === "caregiverPatients" && props.role === "HospitalAdministrator" &&
                    <MenuItem onClick={deleteCaregiverPatients} disableRipple>
                        <DeleteForeverIcon />
                        Delete
                    </MenuItem>
                }
                {props.page === "patients" && props.role === "Doctor" &&
                    <MenuItem onClick={deletePatientToDoctor} disableRipple>
                        <DeleteForeverIcon />
                        Delete from me
                    </MenuItem>
                }
                {props.page === "patients" && props.role === "CaregiverPatient" &&
                    <MenuItem onClick={deletePatientToCaregiverPatient} disableRipple>
                    <DeleteForeverIcon />
                    Delete from me
                    </MenuItem>
                }
            </StyledMenu>
        </div>
    );
}
