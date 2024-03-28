const express=require('express')
const http=require('http');
const PORT=3000;
const path=require('path')
const app=express();
const server=http.createServer(app);

const io=require('socket.io')(server)

app.use(express.static(path.join(__dirname,"public")))



io.on('connection',(socket)=>{
    var name;
    console.log(`A new user connected : ${socket.id}`)

    socket.on('joining msg',(username)=>{
        name=username;
        console.log(`${username} joined the chat`)

        var newMssg=`---${name} joined the chat---`
        io.emit('chat message',newMssg)

    })

    socket.on('disconnect',()=>{
        console.log(`${name} disconencted`)
        io.emit('chat message',`---${name} left the chat---`)
    })

    socket.on('chat message',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('chat message',msg)
    })
    
})




// app.listen(PORT,()=>{
//     console.log(`Listening on port ${PORT}`)
// })

server.listen(3000,()=>{
    console.log('Server listening on:3000')
})