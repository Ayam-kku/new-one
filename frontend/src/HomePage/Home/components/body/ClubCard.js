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
import { getAllClub } from "./BodyService";
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

  const [clubs, setClubs] = useState([]);

 
  useEffect(() => {
    getAllClub().then((u) =>{ 
        setClubs(u)});
  }, [])



  const renderCard = (card, index) => {
    return (
        <Card className={classes.root} key={index}>
            <CardActionArea  
            onClick={() => {
              navigate('/app/home/club',{ state: card });
            }}
            >
                <CardMedia
                className={classes.media}
                image="/static/images/background/twitter.jpg"
                title="Contemplative Reptile"
                />
                <CardContent>
                <p className="text-green-500 font-bold text-xl mb-5 uppercase">
                    {card.clubName}
                </p>
                <Typography variant="body2" color="textSecondary" component="p">
                    {card.clubInfo.vision}
                </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions className="justify-between">
                <p size="small" className="text-green-500 font-bold" >
                {card.clubType}
                </p>
                <p size="small" className="text-green-500 font-bold ">
                {card.college.name}
                
                </p>
            </CardActions>
    </Card>
        )
    }

    return(
      <>
        {clubs.length > 0 &&<Carousel 
        itemsToShow ={3}
        itemsToScroll={3}
        
        //showArrows={false}
        enableAutoPlay={true} 
        onChange={(currentItemObject, currentPageIndex) => {
          console.log(currentItemObject,currentPageIndex);
        }}
        >
        {clubs.map((item, index)=> {
          return( 
        <div className=" m-2" key={index}>{renderCard(item,index)}</div>
        )})}
      </Carousel>}
    </>
    )
}
export default EventCard;