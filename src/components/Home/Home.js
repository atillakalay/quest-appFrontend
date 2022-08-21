import React, { useEffect, useState }  from "react";
import Post from "../Post/Post";
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles'

const useStyles=makeStyles((theme)=>({
    container:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center",
        backgroundColor:'#cfe8fc',
        height:'100vh'
    }
}));

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [ postList, setPostList ] = useState([]);

    useEffect(()=> {
        fetch("/posts")
        .then(res=>res.json())
        .then(
            (result)=>{
                setIsloaded(true);
                setPostList(result)
            },
            (error)=>{
                console.log(error);
                    setIsloaded(true);
                setError(error);
            }
        )
    })

    if (error) {
        return <div>Error!!!</div>
    }else if (!isLoaded) {
        return <div>Loading...</div>
    }else{
        return(
            <Container fixed className="{classes.container}">
                {postList.map(post=>(
                    <Post userName={post.userName} userId={post.userId} title={post.title} text={post.text}></Post>
                
                ))}
    </Container> 
        )
    }
    }

export default Home;