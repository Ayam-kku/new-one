import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { changeStatusOfStateToFalseUpdate,addPosition,addInfoClub } from '../actions/clubs';

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        position: 'absolute',
        top: theme.spacing(3)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))
export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.positionEvent);
    let [Infoclub,setInfoClub] = React.useState({});


    return (
        <Dialog open={openPopup} maxWidth={props.maxWidth}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h2" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>

                    {props.maxWidth === "sm" ? (
                     <div>   
                   <Button
                   color="secondary"
                   size="medium"
                   onClick={()=> { 
                       if (status.lat === undefined) {
                       dispatch(addPosition({ lat: 18.247733805866837, lng: 42.56021976470947 }));
                   }
                   setOpenPopup(false) 
                   }}
                   >
                   Save    
               </Button>

                <Button
                color="secondary"
                onClick={()=> {
                     setOpenPopup(false);
                      }}>
                <CloseIcon />
                </Button>
                </div>
            ) : (
                <Button
                color="secondary"
                onClick={()=> { 
                    if (props.updatePopUpEvent !== undefined && props.updatePopUpEvent === true) {
                        dispatch(changeStatusOfStateToFalseUpdate());
                        dispatch(addInfoClub(Infoclub));
                        dispatch(addPosition(Infoclub));
                    }
                    else {
                    setOpenPopup(false); } }}>
                <CloseIcon />
            </Button>
            )}
                </div>
            </DialogTitle>
            {props.maxWidth === "sm" ? (
                 <DialogContent style={{ padding:"0px" }}>
                 {children}
                </DialogContent>
            ) : (
                <DialogContent>
                 {children}
                </DialogContent>
            )}
           
        </Dialog>
    )
}
