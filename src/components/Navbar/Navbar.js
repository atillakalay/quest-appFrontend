import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign:"left"
    },
    link:{
        textDecoration:"none",
        boxShadow:"none",
        color:"white"
    }
  }));
  

function Navbar() {
    const classes = useStyles();
    let userId=5;
    return(

        <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>Home</Link>
            </Typography>
            <Typography variant="h6" classes={classes.title}>
            <Link to={{pathname:'/users/'+userId}} className={classes.link}>User</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        </div>
    )
}

export default Navbar;