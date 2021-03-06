import React, { useState, useEffect } from "react";
import SingleMessage from "./SingleMessage.js";
import { NewMessage } from "./NewPostInput.js";

import "./Chat.css";

/**
 * @typedef UserObject
 * @property {string} _id
 * @property {string} name
 */
/**
 * @typedef MessageObject
 * @property {UserObject} sender
 * @property {string} content
 */
/**
 * @typedef ChatData
 * @property {MessageObject[]} messages
 * @property {UserObject} recipient
 */

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 *
 * Proptypes
 * @param {ChatData} data
 */
const Chat = (props) => {
  return (
    <>
      <h3>
        {"Chatting with "}
        {
          props.data.recipient.name === "ALL CHAT"
          &&
          <img className="profilepic" src="../../../people2.png"/>
        }
        {
          props.data.recipient.name !== "ALL CHAT"
          &&
          <img className="profilepic" src={props.data.recipient.picture}/>
        }
        {" " + props.data.recipient.name}
      </h3>
      <div>
        {props.data.messages.map((m, i) => (
          <SingleMessage message={m} key={i} />
        ))}
      </div>
      <NewMessage recipient={props.data.recipient} />
    </>
  );
}

export default Chat;