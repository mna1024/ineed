import React, { useEffect, useState } from "react";
import ChatList from "../modules/ChatList.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Messages.css";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Messages = (props) => {
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

  const [allUsers, setAllUsers] = useState([]);

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: [],
  });

  const loadMessageHistory = (recipient) => {
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      setActiveChat({
        recipient: recipient,
        messages: messages,
      });
    });
  };

  useEffect(() => {
    document.title = "ineed";
  }, []);

  useEffect(() => {
    loadMessageHistory(activeChat.recipient);
  }, [activeChat.recipient._id]);

  useEffect(() => {
    get("/api/allUsers").then((allUsersList) => {
      // If user is logged in, we load their chats. If they are not logged in,
      // there's nothing to load. (Also prevents data races with socket event)
      
      if (props.userId) {
        setAllUsers([ALL_CHAT].concat(allUsersList));
      };
    });
  }, []);

  useEffect(() => {
    const addMessages = (data) => {
      if (
        (data.recipient._id === activeChat.recipient._id &&
          data.sender._id === props.userId) ||
        (data.sender._id === activeChat.recipient._id &&
          data.recipient._id === props.userId) ||
        (data.recipient._id === "ALL_CHAT" && activeChat.recipient._id === "ALL_CHAT")
      ) {
        setActiveChat(prevActiveChat => ({
          recipient: prevActiveChat.recipient,
          messages: prevActiveChat.messages.concat(data),
        }));
      }
    };
    socket.on("message", addMessages);
    return () => {
      socket.off("message", addMessages);
    };
  }, [activeChat.recipient._id, props.userId]);

  useEffect(() => {
    const callback = (data) => {
      /*
      setActiveUsers([ALL_CHAT].concat(data.activeUsers));
      */
    };
    socket.on("activeUsers", callback);
    return () => {
      socket.off("activeUsers", callback);
    };
  }, []);

  const setActiveUser = (user) => {
    if (user._id !== activeChat.recipient._id) {
      setActiveChat({
        recipient: user,
        messages: [],
      });
    }
  };

  if (!props.userId) {
    return <div>Log in before using Messages</div>;
  }
  return (
    <>
      <div className="Messages-container">
        <div className="Messages-userList">
          <ChatList
            setActiveUser={setActiveUser}
            userId={props.userId}
            users={allUsers}
            active={activeChat.recipient}
            />
        </div>
        <div className="Messages-chatContainer">
          <Chat data={activeChat}/>
        </div>
      </div>
    </>
  );
}

export default Messages;
