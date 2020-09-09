//user handling functions

const users = [];

const addUser = ( {id,name,room} ) =>{

    //trim the name
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUsers = users.find((user) => user.room === room && user.name === name);
    if(existingUsers){
        return {error: 'User name is taken !'}
    }
    const user = {id, name, room };
    users.push(user);
    return {user}
}


const removeUser =(id) =>{
    const index = users.find((user) => user.id === id);
    if(index!==-1){
        return users.splice(index,1)[0];
    }
}


const getUser = (id) =>{
    console.log(users);
    return users.find((user) => user.id === id)


}

const getUserInRoom = (room) => {

    users.filter((user) => user.room === room)
}


module.exports = {addUser,getUserInRoom,getUser,removeUser}