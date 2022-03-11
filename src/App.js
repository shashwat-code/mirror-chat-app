
import './App.css';
import React, { useEffect, useState } from 'react';
import Avatar from  './Lustro.png';
import moment from 'moment';


const App=()=>{
  const[userMessage, setUserMessage] = useState([]);
  const [isDarkModeActive, setIsDarkModeActive] = useState(false)
  const [savedChat, setSavedChat] = useState([]);
  const[input,setInput] = useState("");
  const[isEmpty,setEmpty]=useState(true)
  const [error, setError] =useState(null)
  useEffect(()=>{
    let getChat = localStorage.getItem('chats');
    let data  = JSON.parse(getChat)
    if(data===null){
      setSavedChat([])
      return
    }
    setSavedChat(data);},[])
  // MODE settings  
  const switchModes = (mode) => {
    if(mode === "light") {
      setIsDarkModeActive(false)
    } else if(mode === "dark") {
      setIsDarkModeActive(true)
    }
  }
  
  const send = e =>{
    // if(input.length===0){
    //   setEmpty(true)
    //   return
    // }
    // setEmpty(true)
    try {
      e.preventDefault();
      let copy = [...savedChat];
      const date = new moment()
      const deliveryTime = `${date.get('hour')}:${date.get('minute')}`
      console.log(deliveryTime)
      copy = [...copy, { chatID: savedChat.length + 1, chatMessage: input,DeliveryTime: deliveryTime}];
      setSavedChat(copy);
      setInput("")
      localStorage.setItem('chats', JSON.stringify(savedChat));
    }catch (error) {
      setError( error );
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
    
    {savedChat?savedChat.map((message)=>{
       return<><div key={message.chatID}  className={isDarkModeActive ? "userMessage dark-userMessage" : "userMessage"}>
         <div  id='userInputMessage' className={isDarkModeActive ? "message dark-message" : "message"}>
       {message.chatMessage}
      </div>
        <div>{message.DeliveryTime}</div>
       </div>
      <div className='chatBotResponse' key={message.chatID+"12"}> 
        <div  id="chatBotResponseMessage" className={isDarkModeActive ? "message dark-message" : "message"} >
          {message.chatMessage}
          </div>
          <div>{message.DeliveryTime}</div>
          </div></> }):<>Loading</>}
    </div>
    
      
    
   
    <div className={isDarkModeActive ? "chatBoxInput dark-chatBoxInput" : "chatBoxInput"}  >
    
    <form action="#0" id="user-input-form">
    <input type="text" id="user-input" className={isDarkModeActive ? "userInput dark-userInput" : "userInput"} placeholder="Talk to Luke..."value={input} onChange={e=>{setInput(e.target.value)}}/>
    <button type='submit' disabled={!isEmpty}  className= {isDarkModeActive ? "sendButton dark-sendButton" : "sendButton"} onClick={send}>Send</button>
  </form>
    </div>
  </div>)
} 
export default App;
