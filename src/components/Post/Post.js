import React, { useState, useEffect } from "react";

function Post() {
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
            <ul>
                {postList.map(post=>(
                    <li>
                        {post.title} {post.text}
                
                    </li>
                ))}
            </ul>
        )
    }
}

export default Post;