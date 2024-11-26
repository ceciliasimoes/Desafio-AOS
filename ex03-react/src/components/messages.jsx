import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

export const Messages = () => {
  const apiUrl = process.env.REACT_API_URL;
  const {
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();
  const [messages, setMessages] = useState([]);
  const getAccessToken = async () => {
    let token;
    console.log("getAccessToken");
    try {
      console.log("getAccessToken before silently");
      token = await getAccessTokenSilently();
      console.log("getAccessToken after silently");
    } catch (e) {
      if (e.error === "login_required") {
        // if silent auth fails, fall back to popup
        token = await getAccessTokenWithPopup();
      } else {
        console.error(e);
      }
    }
    console.log("token", token);
    return token;
  };
  const checkMessages = async () => {
    const token = await getAccessToken();
    console.log("token", token);
    const response = await fetch(`${apiUrl}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const messages = await response.json();
    // setMessages(messages);
    console.log(messages);
  };
  useEffect(() => {
    console.log("useEffect");
    checkMessages();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h2>Qtd Messages = {messages.length}</h2>
        <ul>
          {messages.length > 0 &&
            messages.map((message) => <li>{message.text}</li>)}
        </ul>
      </div>
    )
  );
};
