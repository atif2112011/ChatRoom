
var name1=prompt("Please enter your name")
var socket=io();

socket.emit('joining msg',name1)

$('form').submit(function(e){
    e.preventDefault();
    socket.emit('chat message',(name1 +": "+$('#m').val()));
    
    $('#messages').append($('<li id="list">').text('You: '+$('#m').val()))

    $('#m').val('');

    return false


})

socket.on('chat message',function(msg){
    $('#messages').append($('<li>').text(msg))
})