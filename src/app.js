//We create http service with express
const express = require('express');
const app = express();
const http = require('http');
const { disconnect } = require('process');
//FIleupload
const fileUpload = require('express-fileupload');
//We mount server and create socket connection 
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
        origin: "http://localhost:8080",    
        methods: ["GET", "POST"]  
  }
});


//Main method for redirecting to static files (index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  /// Esta linea es necesaria para poder usar archivos relativos como style.css
app.use(express.static(__dirname + '/public'));

//------------------------- FILE UPLOAD MANAGEMENT ----------------------------------------------------
app.use(fileUpload());

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;
console.log("recibe post")
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.fileSend;
  uploadPath = __dirname + '/public/' + sampleFile.name;
  console.log("recibe post22222")

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    console.log("recibe post43333333")

    if (err){
      console.log(err)
      console.log("Errror culiao")

      return res.status(500).send(err);
    }


    res.send('File uploaded!');
  });
});

//------------------------- END FILE UPLOAD MANAGEMENT ----------------------------------------------------

  //Aqui las variables que usaremos
var usuarioConect = 0;
var listaUsuarios = []
var userList = [];

//Functions
function disconnectUserSocket(userSocket){
  console.log(userSocket)
  for(let i=0; i>userList.length; i++){
    if(userSocket == userList[i].socket){
      userList.splice(i, 1); 
    }
  }
}
//--------------------EN CONEXION---------------------------- 
io.on('connection', (socket) => {
    // Broadcast a todos menos a ti //
    io.emit("connection:user:userList", userList)

    // Socket dice al que entra cuantos usuarios hay conetacos //
    socket.emit('numUsuarios' , usuarioConect);
    //Sum 1 more connected
    usuarioConect++
    console.log('Connected Users: '+usuarioConect);


//--------------------EN DESCONEXION---------------------------- 
    socket.on('disconnect', (socket) => {
      console.log('user disconnected');
      usuarioConect--  
      console.log('Connected Users: '+usuarioConect);
      disconnectUserSocket(socket.id)
    });
    //Socket define el tipo de mensaje como es logueo
    //Muchos clientes mandan logueo o cualquier mensajepred
    //Otro buen ejemplo sería empieza partida
    //Basicamente se encarga de que el resto de usuarios conectadps se enteren de los cambios 
    //Los cambios son estos mensajesPredef

    ///Aqui recibimos los ususarios que se van conectando y los metemos en un array 


    socket.on("connection:user",(data) => {
      console.log(data)
      console.log("Data name: "+data.name)
      socket.username = data.name
          userList.push({
            namex: data.name,
            //statex: data.state,
            socket: socket.id,
            img: data.img
          })
      console.log(userList)
      io.emit("connection:user:userList", userList)
    })
    

    //Aqui se reciben datos
    // socket.on('chat:message', (data) => {
    //     console.log("SErvidor: "+data)
    //     //Aqui los vuelve a enviar al cliente (socket), o a todos los clientes(sockets) 
    //     listaUsuarios.forEach(element => {
    //         if(data.username){
    //             console.log("Mamaste pinga")
    //         }else{
    //             listaUsuarios.push({
    //                 username: data.username,
    //                 socketId: socket.id
    //             })
    //         }
    //     });

    //     io.emit("user-connected")
    //     //Aqui se emiten los usuarios conectados
    //     socket.emit("chat:users", listaUsuarios)

    //     io.to(socket.id).emit('chat:message:mine', data)
    //     socket.broadcast.emit("chat:message:his", data)



    // })

    // ---------------------- MESSAGE: DATA MANAGEMENT -----------------------------
    socket.on("chat:messagex", (data) => {
      console.log(data)
      //console.()
      //console.log(userList)
      var found ;
      for(let i = 0; i<userList.length; i++) {
        if(userList[i].socket == data.socket){
          console.log(userList[i].namex)
          found = userList[i].namex
        }
      }
      socket.broadcast.emit("chat:messagex", {data: data.value, name: found})

    })
    //-----------------------------------------------------------------------


    socket.on('logueo', (msg) => {
        // socket.broadcast.emit('hi');
        console.log('chupatetas mandado: ' + msg);  
      });
      console.log(listaUsuarios)


});



//Listening port 3000 for this app
server.listen(3000, () => {
    console.log('listening on *:3000');
  }); 
  