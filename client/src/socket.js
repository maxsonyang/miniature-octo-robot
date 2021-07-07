import io from "socket.io-client";
import axios from "axios";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  markSentAsRead,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
    
  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("update-active-read", async (keys) => {
    try {
      const { data } = await axios.get("/auth/user");
      if (keys.sender === data.id) {
        store.dispatch(markSentAsRead(keys.recipient));
      }
    } catch (error) {
      console.log(error);
    }
  })

  socket.on("new-message", (data) => {
    const { activeConversation } = store.getState();
    store.dispatch(setNewMessage(data.message, data.sender, activeConversation));
  });
});

export default socket;
