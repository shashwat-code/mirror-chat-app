
import './App.css';
import React, { useEffect, useState } from 'react';
import Avatar from  './Lustro.png';



const App=()=>{
  const[userMessage, setUserMessage] = useState([]);
  const [isDarkModeActive, setIsDarkModeActive] = useState(false)
  const [savedChat, setSavedChat] = useState();
     //JSON.stringify(localStorage.getItem('chats'));
    //setData(savedChats)
  const[input,setInput] = useState("");
  const [error, setError] =useState(null)
  useEffect(()=>{
    let savedChats = localStorage.getItem('chats');
    function parseData(savedChats) {

      if (!savedChats){ console.log("firstif",savedChats) ;return {}};
      if (typeof savedChats === 'object') {console.log("objif",savedChats);return savedChats};
      if (typeof savedChats === 'string') {console.log("strtif",savedChats);return JSON.parse(savedChats)};
      console.log("afterif",savedChats)
      return {};
  }
  savedChats =parseData(savedChats);
    console.log("savedchats",savedChats)
    setSavedChat(savedChats);
    console.log("savedchat", savedChat);
   /*if(savedChats && savedChats.chatMessage){ Object.keys(savedChats).map((singleChat,index)=>{
      let copy = [...userMessage];
      copy = [...copy, { chatID: userMessage.length + 1, chatMessage: singleChat.chatMessage }];
      console.log("copy in useffect", copy)
      setUserMessage(copy);
      //send();
      return;
    })}*/
   
    //setUserMessage(savedChats);
  },[])

  /*useEffect(()=>{
    let copy = [...userMessage];
    copy = [...copy, { chatID: userMessage.length + 1, chatMessage: data }];
    setUserMessage(copy);
  },[data])*/


  /*useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      
    };
  }, []);
  
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    let message =
      "Do you want to save your chat?";
    e.returnValue = message;
    return message;
  };*/


  const switchModes = (mode) => {
    if(mode === "light") {
      setIsDarkModeActive(false)
    } else if(mode === "dark") {
      setIsDarkModeActive(true)
    }
  }
  
  const send = e =>{
    try {
      // Do something that could throw
      e.preventDefault();
      console.log("start");
      let copy = [...userMessage];
      copy = [...copy, { chatID: userMessage.length + 1, chatMessage: input }];
      setUserMessage(copy);
      console.log("copy",copy);
      setInput("")
      console.log("in send",userMessage);
      //localStorage.setItem('chats', userMessage);
      localStorage.setItem('chats', JSON.stringify(userMessage));
    } catch (error) {
      setError( error );
      console.log(error);
    }
 
}


  return(<div className='chatBox'>
    
    <div className={isDarkModeActive ? 
  "chatBoxHeader dark-chatBoxheader" : 
  "chatBoxHeader"}>
    
    <img src={Avatar} alt='' className='chatBoxHeaderAvatar'/>
    <h2 className='chatBoxHeaderAvatarName'>Luke Grey</h2>
    <div className={isDarkModeActive ? "toggle-dark": "toggle-light"}>
  <h4 className="light-mode" onClick={() => switchModes("light")}>
    Light
  </h4>
  <h4 className="dark-mode" onClick={() => switchModes("dark")}>
    Dark
  </h4>
</div>
    </div>
    <div  className={isDarkModeActive ? "chatBoxBody dark-chatBoxBody" : "chatBoxBody"}>
    
    {userMessage.map((message)=>{
       return<><div  className={isDarkModeActive ? "userMessage dark-userMessage" : "userMessage"}>
         <div   id='userInputMessage' className={isDarkModeActive ? "message dark-message" : "message"}>
       {message.chatMessage}
      </div> </div>
      <div className='chatBotResponse'> 
        <div  id="chatBotResponseMessage" className={isDarkModeActive ? "message dark-message" : "message"} >
          {message.chatMessage}
          </div></div></> })}
    </div>
    
      
    
   
    <div className={isDarkModeActive ? "chatBoxInput dark-chatBoxInput" : "chatBoxInput"}  >
    
    <form action="#0" id="user-input-form">
    <input type="text" id="user-input" className={isDarkModeActive ? "userInput dark-userInput" : "userInput"} placeholder="Talk to Luke..."value={input} onChange={e=>{setInput(e.target.value)}}/>
    <button type='submit' className= {isDarkModeActive ? "sendButton dark-sendButton" : "sendButton"} onClick={send}>Send</button>
  </form>
    </div>
  </div>)
} 
export default App;
