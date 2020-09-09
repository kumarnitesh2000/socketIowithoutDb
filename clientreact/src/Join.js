import React, {useState} from 'react';
import {Link} from 'react-router-dom'


function Join(props) {
    const [name,setName] = useState('')
    const [room , setRoom] = useState('') 
    return (
        <div>
            <h1>Join</h1>
            <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
            <input type="text" placeholder="Room" value={room} onChange={(event) => setRoom(event.target.value)} /> 
            <Link
            onClick={event => (!name || !room) ? (event.preventDefault()) : (null)} 
            to={`/chat?name=${name}&room=${room}`}>
                <button type="submit">Sign In</button>
            </Link>
        </div>
    );
}

export default Join;