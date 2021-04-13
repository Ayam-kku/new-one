import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
   
}))

export default function Popup(props) {

    const { children, openPopup, setOpenPopup } = props;
    
   
    return (
        <Dialog open={openPopup} >
         
            <DialogTitle className="relative flex flex-col break-words w-full bg-gray-300">
            <div className="flex justify-between">
                <h4
                className="text-black text-lg mr-2"
                > 
                Enter your information to register in the event </h4>
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none"
                        type="button"
                        onClick={()=>{setOpenPopup(false)}}
                      >
                        <CloseIcon />
                      </button>
            </div>
            
            </DialogTitle>
             
            <DialogContent style={{padding:0}} >
                {children}
            </DialogContent>
        </Dialog>
    )
}
