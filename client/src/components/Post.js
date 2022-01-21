import {get} from "../utilities.js";
import React, { Component } from "react";
import "../utilities.css";

const Post = ({name,ineed,offer,other,datetime,page}) => {
    return (
      
        <div className="boxed">
        < img className = "profilepic" src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt = "profile pic" ></img>
       <div className = "name">{name}</div> 
       <br></br>
        <div className = "ineed">I Need</div> 
        <div className = "postInfoNeed">{ineed}</div>
        <br></br>
        <div className = "ioffer">I offer</div>
        <div className = "postInfoOffer">{offer}</div>
        <br></br>
        <div className = "other" >Other</div>
        <div className = "postInfoOther">{other}</div>
        <br></br>
        <div class = "time">{datetime}</div>
        <br></br>
        <button type="button" class="btn btn-outline-success">Message</button>
        <br></br>
        {
                page === "profile" &&
                <button type="button" class="btn btn-outline-success">Edit</button>
        }
        </div>
    );
  };
  
  export default Post;