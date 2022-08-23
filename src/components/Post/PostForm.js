import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { Button, InputAdornment, OutlinedInput, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        textAlign : "left",
        margin : 20

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)', color: 'white'
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white"
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


function PostForm(props) {
    const { userId, userName,refreshPosts } = props;
    const classes = useStyles();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSend,setIsSend]=useState(false);

    const savePost = () => {
        fetch("/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        savePost();
        setIsSend(true);
        setTitle("");
        setText("");
        refreshPosts();
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSend(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSend(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSend(false);
      };

    return (
<div>
<Snackbar open={isSend} autoHideDuration={1200} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success">
    Your post is send!
  </Alert>
</Snackbar>

        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Link to={{ pathname: '/users/' + userId }} className={classes.link}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                }
                title={<OutlinedInput
                    id="outlined-adornment-amount"
                    multiline
                    placeholder='Title'
                    inputProps={{ maxLength: 25 }}
                    fullWidth
                    value={title}
                    onChange={(i) => handleTitle(i.target.value)}
                >
                </OutlinedInput>}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        multiline placeholder='Text'
                        inputProps={{ maxLength: 250 }}
                        fullWidth
                        value={text}
                        onChange={(i) => handleText(i.target.value)}
                        endAdornment={
                            <InputAdornment position='end'>
                                <Button
                                    variant='contained'
                                    style={{ background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)', color: 'white' }}
                                    onClick={handleSubmit}
                                >
                                    Post
                                </Button>
                            </InputAdornment>
                        }
                    >

                    </OutlinedInput>
                </Typography>
            </CardContent>
        </Card>
        </div>
    )
}

export default PostForm;