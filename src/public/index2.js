// var modal = document.getElementById("myModal");
//---------------------MODAL METHODS-----------------------------
function hideModal() {
    var modal = document.getElementById("myModal")
    modal.style.display = "none";
  }

function checkIfEmpty(input){
    if(!input.value == ""){
        return true
    }else{
        return false
    }
}

// ------------------------------ MESSAGE METHODS --------------------------------------
function buildMessage(text, x, name) {
    var element = document.createElement('div');
    var messType = ""
    if(x==1){
        messType = "sent"
    }else if(x == 2){
        messType= "received"
    }

    element.classList.add('message', messType);
    if(name){
        element.innerHTML = '<strong>'+name+'</strong>: ' +text +
        '<span class="metadata">' +
            //'<span class="time">' + moment().format('h:mm A') + '</span>' +
            '<span class="tick tick-animation">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
            '</span>' +
        '</span>';
        console.log(name)

    }else{
        element.innerHTML = text +
        '<span class="metadata">' +
            //'<span class="time">' + moment().format('h:mm A') + '</span>' +
            '<span class="tick tick-animation">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
            '</span>' +
        '</span>';

    }

    return element;
}

function animateMessage(message) {
    setTimeout(function() {
        var tick = message.querySelector('.tick');
        tick.classList.remove('tick-animation');
    }, 500);
}


window.onload = () => {

    var span = document.getElementsByClassName("close")[0];
    var btn = document.getElementsByClassName("send-name")[0];
    var modal = document.getElementById("myModal")
    var inputName = document.querySelector(".name-field")
    var inputState = document.querySelector(".state-field")
    //Form
    var cc = document.querySelector(".conversation-container")
    var form = document.querySelector('.conversation-compose');
    var radios = document.getElementsByClassName("input-hidden")
    var inputMessage = document.querySelector(".input-msg")

    var clientName = "";
//-----------------------------------------------------------------
    //Send Message listener
    form.addEventListener('submit', newMessage);
    inputMessage.addEventListener("keypress", function(){typing(clientName)})

    function callbackName(name){
        inputMessage.addEventListener("keypress", typing(name))
    }
    function typing(name){
        var status = document.querySelector(".status")
        var inputMessage = document.querySelector(".input-msg")
        if(inputMessage.value.length == 0){
            status.innerHTML = "en el taxi"
        }else if(inputMessage.value != ""){
            status.innerHTML = name+" is typing..."
    
        }
    }
//-----------------------------------------------------------------
    //Shows modal
    modal.style.display = "block";
    //Sends Modal info 
    
    function sendInfo(name, state){
        console.log(name, state)
        clientName = name
        // radios.forEach(element => {
        //     console.log(element.value)
        // });
        for(let i=0; i<radios.length; i++){
            if(radios[i].checked){
                //console.log("Radio: "+radios[i].value)
                socket.emit('connection:user', {
                    name: name,
                    state: state,
                    img: radios[i].value
                });
            }
        }
        //callbackName(name)
    }
//-----------------------------------------------------------------
    //----------------------- ONSUBMIT FILE UPLOAD----------------------------------------------------
    $("#btnSendF").on("click", function(){
       var file = $('.input-img');
        //SAved data:
        var formData = new FormData();
        formData.append("fileSend", document.getElementById("fileSend").files[0]);
        //Envío con ajax
        $.ajax({
            url: "/upload",
            type: "post",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            //dataType : 'json',
        }).done(function(){
            console.log("Mamapinga222222")
            let nuevo = $('<div class="message received">')
            .html(`
                <div class="imgdiv">
                    <img src="${document.getElementById("fileSend").files[0].name}"/>
                </div>
            `)
            .append(`<span class="metadata"><span class="time"></span></span>`)
            .prepend(`<div class="username" style="color:blue"></div>`);;

            $('.conversation-container')
            .append(nuevo);

            //socket.emit('chatimg',archivo)
            //file.val("")
      
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Failed: " + errorThrown);
        }).always(function (a, textStatus, b) {
            alert("Final status: " + textStatus);
         });
            
    });

    //--------------------- ONCLICK MODAL FOR USER ADDING --------------------------------------------
    span.onclick = function(){
        hideModal()
    } 
    btn.onclick = span.onclick = function(){
        
        sendInfo(inputName.value, inputState.value)
        hideModal()
        socket.on('connection:user:userList', function(users){
            console.log(users)
            //Por esto se repetía todo
            document.querySelector(".aside").innerHTML=""
            users.forEach(element => {
                console.log("sucediooooo")
                //console.log(data)
                document.querySelector(".aside").innerHTML+=`
                <div class="chip">
                    <img src="${element.img}" alt="Person" width="96" height="96">
                    ${element.namex}
                    <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
                </div>
                `         
            });
        
        })
        //------------------------- MESSAGES SECTION ------------------------------
    }   
    //--------------------- ONCLICK FINISHED--------------------------------------------

    //--------------- MESSAGE SOCKET SENDER  -------------------------------
    function newMessage(e) {
        var cc = document.querySelector(".conversation-container")
        var input = e.target.input;
        var value = input.value;

        // ----------- My message built here ---------------
        if (input.value) {
            var message = buildMessage(input.value, 1);
            cc.appendChild(message);
            animateMessage(message);
        }
        input.value = '';
        cc.scrollTop = cc.scrollHeight;

        e.preventDefault();
        //-----------------------------------------------------
        //-------------- 1º Emit Message for other users --------------------
        socket.emit("chat:messagex", {value: value, socket:socket.id})
        // ------------- 2º Recieve emmited for other sockets----------------
    }
    //--------------- END MESSAGE SOCKET SENDER -------------------------------



    ///////////////////////////////////////////////////////////////
    //Para evitar la repeticion de los mensajes 
    //cuyo priblema me costó resolver bastante;
    //Se debe sacar el socket.on recibidor de la funcion
    //que lo manda, en este cso newMessage
    ////////////////////////////////////////////////////////////////////
    //---------------SOCKET RECEIVER -------------------------------
    socket.on("chat:messagex", (data) => {
        console.log(data)
        var message = buildMessage(data.data, 2, data.name);
        cc.appendChild(message);
        animateMessage(message);
    })
    //---------------END SOCKET RECEIVER -------------------------------

} 

// socket.emit('chat:message', {
//     message: message.value,
//     username: username.value
// });

// socket.on('chat:message', function(data){
//     console.log("Servidor dice:"+data.message)
//     output.innerHTML+=`
//     <p class="chat-message-text-mine"><span class="span-name">${data.username}: </span>${data.message}</p>
//     `
// })

 