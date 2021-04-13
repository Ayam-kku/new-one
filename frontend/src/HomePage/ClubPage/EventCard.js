import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Carousel from "react-elastic-carousel";
import { getAllEventArray } from "../Home/components/body/BodyService";
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) =>({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  root1: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  titel:{
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5),

  },
  chip: {
    margin: theme.spacing(0.5),
    
  },
}));

const EventCard =() => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [event, setevent] = useState([]);
 

  useEffect(() => {
    getAllEventArray().then((u) =>{ 
      setevent(u)});  
  }, [])
    


  const renderCard = (card, index) => {
    return (
        <Card className={classes.root} key={index}>
            <CardActionArea  
            onClick={() => {
              navigate('/app/home/event',{ state: card });
            }}
            >
                <CardMedia
                className={classes.media}
                image="/static/images/background/twitter.jpg"
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {card.eventName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {card.eventDesc}
                </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button size="small" color="primary" disabled>
                club name
                </Button>
                <Button size="small" color="primary" disabled>
                {card.evenDate}
                </Button>
            </CardActions>
    </Card>
        )
    }

    return(
      <>
      <div className="w-full lg:w-6/12 px-4">
                
              </div>
        {event.length > 0 &&<Carousel 
        itemsToShow ={3}
        >
        {event.map((item, index)=>
        {console.log(item,"abooods",event.length)
          return( 
        <div className=" m-2" key={index}>{renderCard(item,index)}</div>
        )})}
      </Carousel>}
    </>
    )
}
export default EventCard;


