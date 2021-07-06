import axios from "axios";
import socket from "../../socket";
import {
  gotConversations,
  addConversation,
  setSearchedUsers,
  markAsRead
} from "../conversations";
import {
  setActiveChat
} from "../activeConversation";
import { gotUser, setFetchingStatus } from "../user";

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get("/auth/user");
    if (data.id) {
      socket.emit("go-online", {
        id: data.id,
        clientId: socket.id,
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/register", credentials);
    dispatch(gotUser(data));
    socket.emit("go-online", {
      id: data.id,
      clientId: socket.id,
    });
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    dispatch(gotUser(data));
    socket.emit("go-online", {
      id: data.id,
      clientId: socket.id,
    });
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete("/auth/logout");
    dispatch(gotUser({}));
    socket.emit("logout", id);
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await axios.post("/api/messages", body);
  return data;
};

const sendMessage = (data, body) => {
  socket.emit("new-message", {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
  });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    const data = await saveMessage(body);
    dispatch(addConversation(body.recipientId, data.message));
    sendMessage(data, body);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export const markMessagesAsRead = (convo) => async (dispatch) => {
  try {
    axios.post("/api/conversations/read", {
      otherUser: convo.otherUser,
    });
    dispatch(markAsRead(convo.otherUser.id));
  } catch (error) {
    console.error(error);
  }
}

export const updateActiveConvo = (otherUser) => async (dispatch) => {
  try {
    const { data } = await axios.get("/auth/user");
    dispatch(gotUser(data));
    dispatch(setActiveChat(otherUser.username));
    socket.emit("set-active", {
      user: data.id,
      other: otherUser.id,
    });
  } catch (error) {
    console.error(error);
  }
}