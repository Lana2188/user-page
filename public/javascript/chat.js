const socket = io()

// get connected user name
const username = document.getElementById('username').value
const avatar = document.getElementById('avatar').value
// console.log(username)

const form = document.getElementById('form')
const msg = document.getElementById('txt')


socket.emit('name', { username, avatar})


// get online users array
socket.on('users', users =>{
// console.log(users)
showUsers(users)
})
// get username, socketid, avatar, time
socket.on('server', msg => {    
    printMessage(msg)
})



// prevent form submit
form.addEventListener('submit', e => {
    e.preventDefault()

    // get input message
    let message = msg.value

    // emit message
    socket.emit('message', message)
   
    document.getElementById('txt').value = ''
    msg.focus()
})


// show messages
function printMessage(msg) {
    
    if (socket.id === msg.userId) {
        const div = document.createElement('div')
        div.classList.add('d-flex')
        div.classList.add('justify-content-end')
        div.classList.add('mb-4')

        div.innerHTML = `<div class="msg_cotainer_send">
          ${msg.message}   
    <span class="msg_time">${msg.time}  </span> 
</div>
<div class="img_cont_msg">
<img src='${msg.avatar}' class="rounded-circle user_img_msg">
</div>`

        document.getElementById('msgDiv').appendChild(div)

    } else {

        const div = document.createElement('div')
        div.classList.add('d-flex')
        div.classList.add('justify-content-start')
        div.classList.add('mb-4')

        div.innerHTML = `	<div class="img_cont_msg">
    <img src="${msg.avatar}" class="rounded-circle user_img_msg">
</div>
<div class="msg_cotainer">
   ${msg.message} 
    <span class="msg_time">${msg.time}</span>
</div>`

        document.getElementById('msgDiv').appendChild(div)
    }

};

// show users list
function showUsers(users){
    // console.log(users)
    document.getElementById('ul').innerHTML = ''
    for(let user of users){
        // console.log(user)
      const li = document.createElement('li')
 li.classList.add('active')

 li.innerHTML=`	<div class="d-flex bd-highlight">
 <div class="img_cont">
     <img src="${user.avatar}" class="rounded-circle user_img">
     <span class="online_icon"></span>
 </div>
 <div class="user_info">
     <span>${user.username}</span>
    
 </div>
</div>`

li.style.cursor = 'pointer'
document.getElementById('ul').appendChild(li)   

 



    }


}