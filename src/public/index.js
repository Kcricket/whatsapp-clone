console.log("index works")

//VAriables

    var username = document.getElementById("username")
    var message = document.getElementById("message")
   // var button = document.getElementById("btnMessage")
    var output = document.querySelector(".container-chat-message-text")
    //Para mandar estos datos que retiramos del dom, al Servidor, usamos:

    button.addEventListener('click', function(){
        //Aqwui emite los nombres y mensajes de los chavales
        socket.emit('chat:message', {
            message: message.value,
            username: username.value
        });

        //Aqui escuchamos lo que nosdevuelñve el servidor

        //Lo que digo yo para mi:
        socket.on('chat:message:mine', function(data){
            console.log("Servidor dice:"+data.message)
            output.innerHTML+=`
            <p class="chat-message-text-mine"><span class="span-name">${data.username}: </span>${data.message}</p>
            `
        })

        //Lo que digo yo para todos:
        socket.on('chat:message:his', function(data){
            console.log("Servidor dice:"+data.message)
            output.innerHTML+=`
            <p class="chat-message-text-his"><span class="span-name">${data.username}: </span>${data.message}</p>
            `
        })

        socket.on("chat:users", function(users){
            console.log(users)
            users.forEach(element => {
                console.log("Usuarios"+element.username)
            });
        })

        // console.log({
        //     username: username.value,
        //     message : message.value
        // })
    })


