import React from "react";

// import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';

import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";


const AlertPage = () => {
    const dispatch = useDispatch();

    const appUser = useSelector((state:any) => state.app);

    const hideModal = () => {
        dispatch({type: "CHANGE", payload: false})
    };
    
    return (
        <>
            <Dialog
                open={appUser.alert.modal}
                onClose={hideModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Alert variant="outlined" severity={appUser.alert.variant}>
                {appUser.alert.text}
                </Alert>
            </Dialog>
        </>
    );
};

export default AlertPage;

