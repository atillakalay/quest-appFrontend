import React, { useEffect,useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from "react-router-dom";
import { Container } from '@material-ui/core';
import Comment from '../Comment/Comment';

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


function Post(props) {
  const { title, text, userId, userName,postId,likes } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsloaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked,setIsLiked]=useState(false);
  const isInitialMount=useRef(true);
  const [likeCount,setLikeCount]=useState(likes.length);
  const [likeId,setLikeId]=useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount+1)
    }
    else
    deleteLike();
    setLikeCount(likeCount-1)
  };

  const refreshComments=()=>{
    fetch("/comments?=postId="+postId)
    .then(res => res.json())
    .then(
        (result) => {
            setIsloaded(true);
            setCommentList(result)
        },
        (error) => {
            console.log(error);
            setIsloaded(true);
            setError(error);
        }
    )
}

const saveLike = () => {
  fetch("/likes",{
    method:"POST",
    headers: {
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      postId:postId,
      userId:userId,
    }),
  })
  .then((res)=>res.jsom())
  .catch((err)=>console.log(err))
}

const deleteLike = () => {
  fetch("/likes/"+likeId,{
    method:"DELETE",
  })
  .catch((err)=>console.log(err))
}

const checkLikes = () => {
  var likeControl = likes.find((like => like.userId===userId));
  if(likeControl != null){
    setLikeId(likeControl.id);
    console.log(likeId);
    setIsLiked(true);
  }
}

useEffect(()=>{
  if (isInitialMount.current) {
    isInitialMount.current=false;
  }
  else
  refreshComments();
},[commentList])

useEffect(() => {checkLikes()},[])


  return (

    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link to={{ pathname: '/users/' + userId }} className={classes.link}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleLike}
          aria-label="add to favorites">
          <FavoriteIcon style={isLiked ? { color: "red" } : null} />
        </IconButton>
        {likeCount}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className={classes.container}>
{error? "error":
isLoaded? commentList.map(comment=>(
  <Comment userId={1} userName={"user1"} text={comment.text}></Comment>
)):"Loading"}
        </Container>
      </Collapse>
    </Card>
  )
}

export default Post;