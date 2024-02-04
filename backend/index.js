const app = require('express')()
const server = require('http').createServer(app)
//cors: limita quem vai fazer a requisição
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}})

//Porta do backend
const PORT = 3001

io.on('connection', socket=>{
    console.log('Usuario conectado', socket.id);

    //Caso o usuario se desconecte
    socket.on('disconnect', reason =>{
        console.log('O usuario de desconectou', socket.id)
    })

    //Chamar o nome do usuario setado em Join.jsx
    socket.on('setuser', username =>{
        //Atribuir o nome de usuario
        socket.data.username = username
        })
    socket.on('msg', textomsg =>{
        //emitir a mensagem para a pagina do frontend
        io.emit('receber', {
            textomsg,
            autorid: socket.id,
            autor: socket.data.username
        })
    })
})
server.listen(PORT, () => console.log('Foiiiiii'))