import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { makeStyles } from '@material-ui/core/styles'
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor: '#f0f5ff',
    }
}));

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes =useStyles();

    const refreshPosts=()=>{
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsloaded(true);
                setPostList(result)
            },
            (error) => {
                console.log(error);
                setIsloaded(true);
                setError(error);
            }
        )
    }

    useEffect(() => {
        refreshPosts();
    },[postList])

    if (error) {
        return <div>Error!!!</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div className = {classes.container}>
                <PostForm userId={1} userName={"ddd"} title={"title"} text={"text"}></PostForm>
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userName={post.userName} userId={post.userId}  text={post.text} title={post.title}></Post>
                ))}
            </div>
        )
    }
}

export default Home;