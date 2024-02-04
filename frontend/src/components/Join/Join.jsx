import React, {useRef} from 'react'
//Importar o useRef para resgatar o valor digitado em nome usuario
import io from 'socket.io-client'
export default function Join({setChatVisibility, setSocket}){

    const nomeusuario = useRef()
    const enviarnome = async () => {
    //Pegar o valor de Useref
    const username = nomeusuario.current.value
    //Alterar para a pagina chat
    if(!username.trim()) return
    const socket = await io.connect('http://localhost:3001')
    socket.emit('setuser', username)
    setSocket(socket)
    setChatVisibility(true)

    }
    return(
        <div>
        <h1>Join</h1>
        <input type="text" ref={nomeusuario} placeholder='Nome Usuario' />
        <button onClick={()=>enviarnome()}>Entrar</button>
        </div>
        )
}