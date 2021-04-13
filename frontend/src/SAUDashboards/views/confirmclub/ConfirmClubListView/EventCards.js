import React,{ useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  }
}));



const ClubCard = ({ className, club: club, ...rest }) => {
  const classes = useStyles();

const [openPopup, setOpenPopup] = useState(false);
const openInPopup = (item) => { setOpenPopup(true); }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >        
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={1}
        >
          <Avatar
            alt="club"
            src={`http://localhost:5000/uploads\\image.jpeg`}
            className={classes.large}
          />
        </Box>
        <Typography
          align="center"
          color="primary"
          gutterBottom
          variant="h4"
        >
          {club.eventName}
        </Typography>

        <Typography
          align="center"
          gutterBottom
          style={{ wordBreak:'break-word' }}
          variant="body1"
        >
          {club.eventDesc}
        </Typography>

        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          Presenter: <button 
          style={{ color:'#1E8449',background:'none',border:'none',outlineWidth:0 }} 
          >{club.eventPresenter}</button>
        </Typography>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          Coordinator: <button 
          style={{ color:'#1E8449',background:'none',border:'none',outlineWidth:0 }} 
          >{club.eventCoordinator}</button>
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="inline"
              variant="body2"
            >
              Type: <span style={{ color:'#1E8449' }}>{club.eventType.name}</span>
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ClubCard.propTypes = {
  className: PropTypes.string,
  club: PropTypes.object.isRequired
};

export default ClubCard;
