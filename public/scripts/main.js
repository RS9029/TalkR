
// ------------------ SOCKET CONTROL

const messagingArea = document.getElementById('messaging-area');
const chatArea = document.getElementById('chat-area');
const socket = io();

//get username and room name from URL
const {user,rooms} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

//set room name in info section

const roomName = document.getElementById('room-name');

roomName.innerText = rooms;


//init connection to server
socket.on('connect',()=>{
    console.log('front end clear');

    //user joins room
    socket.emit('userJoin',{user,rooms});

    //new user connected broadcast

    socket.on('newConnect', message=>{
        newMessage(message);
        scrollControl();
    })
    
    //  welcome message
    socket.on('welcome',message=>{
        newMessage(message);
        scrollControl();
    })

    //goodbye message
    socket.on('goodbye',message=>{
        newMessage(message);
        scrollControl();
    })


    //update user list

    socket.on('userList',({users})=>{
        updateUserList(users);
    })

    //new message to server
    messagingArea.addEventListener('submit',(e)=>{
        e.preventDefault();
        const messageText = e.target.elements.messageBox.value;

        //send message text to server
        console.log(messageText);
        socket.emit("newMessage",messageText);

        //reset and wipe message box
        e.target.elements.messageBox.value = "";
        e.target.elements.messageBox.focus();
    })

    
})

// return message from server

socket.on('message',message=>{
    newMessage(message);
    scrollControl();
})


//set user and room

socket.on('info',()=>{
    console.log("done")
})

//create new message function

function newMessage(message){
    
    const innerMessage = `
    <img src = "../resources/profile-img.svg" alt="profile-img">
    <div class="message-inner">
        <div class="name-wrapper">
            <h1>${message.username}</h1>
        </div>
        <p class="message">${message.message}</p>
        <div class="time-sent">
            <span>Sent: ${message.time}</span>
        </div>
    </div>
    `;
    const messageContainer = document.createElement('li');
    messageContainer.classList.add('message-outer');
    messageContainer.innerHTML = innerMessage;
    chatArea.appendChild(messageContainer);
}

function scrollControl(){
    chatArea.scrollTop = chatArea.scrollHeight;
}

function updateUserList(users){
    const usersList = document.getElementById('user-list');
    updatedList = `${users.map(user=>`<li class="user"><img src = "../resources/profile-img.svg" alt="profile-img">${user.userName}</li>`).join('')}`;
    usersList.innerHTML = updatedList;
}




// -----------------------------MENU CONTROL

const openMenuBtn = document.getElementById('burger-menu');
const closeMenuBtn = document.getElementById('burger-menu-close');
const menu = document.getElementById('chatroom-info-container');

openMenuBtn.addEventListener('click',openMenu);
closeMenuBtn.addEventListener("click",closeMenu);
window.addEventListener('resize',checkSize);

function checkSize(){
    if(window.innerWidth >=768){
        openMenu();    
    }
    else{
        closeMenu();
    }
}

function openMenu(){
    menu.style.transform = "translateX(0%)";
}

function closeMenu(){
        menu.style.transform = "translateX(-100%)";
}


// ------------------------------ REPORT BUG CONTROL


const reportBtn = document.getElementById('report-bugs');


reportBtn.addEventListener('click', showReport);


function showReport(){

}



