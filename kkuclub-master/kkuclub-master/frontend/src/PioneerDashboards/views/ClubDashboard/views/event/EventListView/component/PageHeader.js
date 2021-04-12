import { Paper, Card, Typography, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles((theme) => ({
    root:{
        backgroundColor:'#1e8449',
        
    },
    pageHeader:{
        padding:theme.spacing(2),
        display: "flex",
        marginBottom:theme.spacing(2)
    },
    pagIcon:{
        display:"inline-block",
        padding:theme.spacing(2),
        color:"#1e8449"   
    },
    pagtitle:{
        paddingLeft:theme.spacing(4),
        color:"#fff",
        '& .MuiTypography-subtitle2':{
            opacity: 0.6
        }
    }
}))

export default function PageHeader(props) {
    const classes = useStyle();
    const { title, subtitle, icon } = props;

    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pagIcon}>
                    {icon}
                </Card>
                <div className={classes.pagtitle}> 
                <Typography
                    variant='h3'
                    component='div'>
                    {title}
                </Typography>
                <Typography
                    variant='subtitle2'
                    component='div'>
                    {subtitle}
                </Typography>
                </div>
            </div>
        </Paper>
    )
}
