import React, {useState,useEffect} from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'

let socket ;

function Chat({location}) {
    const [name,setName] = useState('')
    const [room , setRoom] = useState('')
    const [messag,setMessage] = useState('')
    const [messages,setMessages] = useState([])
    useEffect( () =>{
        const {name, room} = queryString.parse(location.search); 
        socket = io('localhost:5000')
        setRoom(room);
        setName(name);
        console.log(socket);

        socket.emit('join-room', {name, room}, () =>{
            //this is for error handling callback function comming from the backend
            //can display it at the backend     
            //console.log(callback);
        })


        //unmounting from the useEffect 
        return () =>{
            socket.emit('disconnect');
            socket.off();
        }

    }, [location.search])


useEffect( () =>{

    socket.on('message', (message) =>{
        setMessages([...messages, message])

    })

}, [messages]);

const sendMsg = (e) =>{
    e.preventDefault();
    if(messag){
        socket.emit('sendMsg' , messag, () =>{
                setMessage('')
        })
    }
}

console.log(messag,messages);

    return (
        <div style={{alignItems:"center"}}>
            <h1>Chat </h1>
        {
            (messages) ? (
                messages.map(m => (
   <ScrollToBottom> <li> {m.text} by <span style={{backgroundColor:"#eee"}}>{m.user.trim().toLowerCase()}</span></li> </ScrollToBottom>
                ))
            ) : null
        }

            <form>
            <input type="text" value={messag} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMsg(event) : (null)}/>
        <button onClick={(event) => sendMsg(event)}>Send</button>
        </form>
        </div>
    );
}

export default Chat;