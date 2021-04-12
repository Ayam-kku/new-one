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
import DoneIcon from '@material-ui/icons/Done';
import { getAllEventArray, getEventType } from "./BodyService";
import { useNavigate } from 'react-router-dom';
import { Chip, Divider, Paper } from '@material-ui/core';
import { SearchIcon } from "@material-ui/data-grid";
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

  const [input, setInput] = useState('')
  const [event, setevent] = useState([]);
  const [chipData, setChipData] = React.useState([]);
 
  getAllEventArray().then((u) =>{ 
    setevent(u)});

  useEffect(() => {
    getEventType().then((u) =>{ 
      setChipData(u)});
    
  }, [])
    
  const handelSearshInput = (e) => {
    e.preventDefault();
    setInput(e.target.value)
}

  
  
  const handleClick = () => {
    console.info('You clicked the Chip.');
    console.log(event)
  };

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
                COMPUTER PROGRAMMING
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
      <div className="w-full lg:w-12/12 px-4">
                <h2  className="text-green-500 font-bold text-5xl">
                    UPCOMING EVENTS
                </h2>
                <div className="flex flex-wrap justify-center grid-cols-12 mt-16 mb-12">
                <button type="submit" className="p-1 bg-gray-300">
                    <svg 
                    fill="none"
                    stroke="currentColor" 
                    stroke-width="2" 
                    viewBox="0 0 24 24" 
                    className="w-6 h-6">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                </button>
                    <input
                    value={input}
                    onChange={handelSearshInput}
                    input
                    style={{border: "none"}}
                    type="text" className="w-5/6 text-x1 text-white bg-gray-300 border-0 focus:outline-none  text-center focus:text-gray-900 align-middle"
                    SvgIcon={<SearchIcon />}       
                    placeholder="Find a club event"
                  ></input>
                  
                </div>
              </div>
      <div className="flex flex-wrap grid-cols-12 justify-center mb-12">
      {/* <Paper component="ul" className={classes.root1}>
        <h6 className=" m-2 text-m font-bold block uppercase text-gray-400">
          filter by:
        </h6>
          <Divider orientation="vertical" flexItem />
      {chipData.map((data) => {
  

        return (
          <li key={data._id}>
            <Chip
              variant="outlined"
              color='primary'
              icon={<DoneIcon />}
              clickable
              label={data.name}
              onClick={handleClick}
              className={classes.chip}
            />
          </li>
        );
      })}
        </Paper> */}
      </div>
        {event.length > 0 &&<Carousel 
        itemsToShow ={3}
        >
        {event.filter((item)=>{
          if(input==""){
            console.log(item,"yaz12");
            return item
          }
          else if(item.eventName.toLowerCase().includes(input.toLowerCase()) ){
            console.log(item,"yaz11");
              return item
          }
        }).map((item, index)=>
        {console.log(item,"abooods",event.length)
          return( 
        <div className=" m-2" key={index}>{renderCard(item,index)}</div>
        )})}
      </Carousel>}
    </>
    )
}
export default EventCard;


