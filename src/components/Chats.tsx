import React, { useCallback, useEffect } from "react";
import Chat from "./Chat";
import { useDispatch, useSelector } from "../redux/hooks";
import {
  Chats as ChatsType,
  GroupChat,
  GroupMessage,
  PersonalChat,
  PersonalMessage,
  User,
} from "../utils/types";
import { Socket } from "socket.io-client";
import { addIncomingReq, setChats, setCurrentChat } from "../redux/actions";

const Chats: React.FC<{ chats: ChatsType; isEmpty: boolean }> = ({
  chats,
  isEmpty,
}) => {
  const socket: Socket = useSelector((state) => state.socket);
  const currentChat: PersonalChat | GroupChat = useSelector(
    (state) => state.currentChat
  );
  const dispatch = useDispatch();

  const sortedChats = chats.sort((a, b) => {
    return new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime()
      ? 1
      : -1;
  });

  const addMessage = useCallback(
    (msg: PersonalMessage | GroupMessage) => {
      var newChat: any = {};
      let newChats = chats.map((chat) => {
        if ("to" in chat && "to" in msg) {
          if (chat.to._id === msg.to || chat.to._id === msg.from) {
            newChat = chat;
            newChat.messages = [...newChat.messages, msg];
            newChat.updatedAt = msg.updatedAt;
          }
        } else if ("name" in chat && "group" in msg) {
          if (chat._id === msg.group) {
            newChat = chat;
            newChat.messages = [...newChat.messages, msg];
            newChat.updatedAt = msg.updatedAt;
          }
        }
        return chat;
      });
      if ("to" in newChat && "to" in currentChat) {
        if (newChat.to._id === currentChat.to._id) {
          dispatch(setCurrentChat({ ...newChat }));
        } else {
          new Audio("/tuturu.mpeg").play();
        }
      } else if ("name" in currentChat && "name" in newChat) {
        if (currentChat._id === newChat._id) {
          dispatch(setCurrentChat({ ...newChat }));
        } else {
          new Audio("/tuturu.mpeg").play();
        }
      } else {
        new Audio("/tuturu.mpeg").play();
      }
      dispatch(setChats(newChats));
    },
    [dispatch, chats, currentChat]
  );

  const addFriendRequest = useCallback(
    (user: User) => {
      dispatch(addIncomingReq(user));
    },
    [dispatch]
  );

  useEffect(() => {
    socket.on("incoming personal message", addMessage);
    socket.on("incoming group message", addMessage);
    socket.on("incoming friend request", addFriendRequest);

    return () => {
      socket.off("incoming personal message", addMessage);
      socket.off("incoming group message", addMessage);
      socket.off("incoming friend request", addFriendRequest);
    };
  }, [socket, addMessage, addFriendRequest]);

  if (isEmpty) return <>You have no friends. Add your friends and have fun</>;

  if (chats.length < 1) {
    return <div>No chats found</div>;
  }

  return (
    <div className="chats">
      {sortedChats.map((chat, idx) => (
        <Chat chat={chat} key={idx} idx={idx} />
      ))}
    </div>
  );
};

export default Chats;
