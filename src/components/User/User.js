import React from "react";
import { useParams } from "react-router";


function User() {
    const {userId}=useParams();
    console.log(userId);
    return(
        <div>
            User!! {userId}
        </div>
    )
}
export default User;