
( function() {

    const app = document.querySelector(".app")
    const socket = io();
    const inputField = document.getElementById("inputField");
    const chatBox = document.getElementById("chatBox");

    let uname;

    function renderMessage(type, message){
        let messageContainer = app.querySelector(".chat-screen .messages")
        if (type == 'user') {
            let el = document.createElement('div')
            el.setAttribute('class', "message my-message")
            el.innerHTML = `
                <div>
                <div class="name">You</div>
                <div class="text">${message}</div>
                </div>
            `
            messageContainer.appendChild(el)
        }else if(type == 'other'){
            let el = document.createElement('div')
            el.setAttribute('class', "message other-message")
            el.innerHTML = `
                <div>
                <div class="name">Bot</div>
                <div class="text">${message}</div>
                </div>
            `
            messageContainer.appendChild(el)
        }
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight
    }
    
    
    function sendMessage() {
        const message = inputField.value.trim();
        if (message === "") {
          return;
        }
        renderMessage("user", message)
        socket.emit("user-message", message)
        inputField.value = "";
      }
    
      app.querySelector('.chat-screen #exit-chat').addEventListener('click', ()=>{
        socket.emit('exituser', uname)
        window.location.href = window.location.href
    })
    
    
    socket.on('bot-message', (message)=>{
        renderMessage("other", message)
    })
    
    
    // Attach event listeners
    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        sendMessage();
      });
      
      document.getElementById("sendButton").addEventListener("click", sendMessage);
      
      document.getElementById("inputField").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          sendMessage();
        }
      });



})();





// Query DOM elements









