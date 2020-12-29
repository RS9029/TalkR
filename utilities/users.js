const userList = [];

function initUser(id,userName,roomName){
    const user ={
        id,
        userName,
        roomName
    }
    userList.push(user);
    return user
}

function getUser(id){
    return userList.find(user=> user.id === id);
}

function userLeaves(id){
    const index = userList.findIndex(user=>user.id===id);
    if(index !== -1){
        return userList.splice(index,1)[0];
        
    }
}

function getUsersList(room){
    return userList.filter(user=> user.roomName === room);
}


module.exports ={ initUser,getUser,userLeaves,getUsersList};