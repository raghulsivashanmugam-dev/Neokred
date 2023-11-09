import React, { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

function TopBar() {

    const [open, setOpen] = useState(false)

    function openDialog() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleLogout(){
        sessionStorage.clear();
        localStorage.clear();
        window.location.pathname="/"
    }

    return (
        <>
            <div className="top-bar d-flex align-items-center justify-content-end">
                <LogoutIcon className="mr-10 cursor-pointer" onClick={() => openDialog()} />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure want to logout?"}
                </DialogTitle>
                <DialogActions>
                    <Button variant="primary" onClick={handleClose}>No</Button>
                    <Button onClick={handleLogout} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )

}

export default TopBar