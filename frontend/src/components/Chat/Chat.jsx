import React, {useRef, useState, useEffect} from 'react'
import  "./chatstyle.css"
export default function Chat({socket}){

    const mensagem = useRef()
    const [messageList, setMessageList] = useState([])

    useEffect(() =>{
        socket.on('receber', data => {
            //Inserir na messageList
            setMessageList((current) => [...current, data])
        })

        // Executar o socket 1 vez
        return () => socket.off('receber')
    }, [socket])

    const enviarmsg = () => {
        const msg = mensagem.current.value
        if(!msg.trim()) return
        socket.emit('msg', msg)

    }

    //Limpar o campo da mensagem após enviar
    const limpar = () =>{
        mensagem.current.value = ''
    }
    return(
        <div>
            <div className='chat-container'>
            <div className='chat-body'>
        {
            messageList.map((msg, index) =>(
                <div className={`${["message-container"]} ${msg.autorid === socket.id && ["message-mine"]}`} key={index}>
                <div className='message-autor'><strong>{msg.autor}</strong></div>
                <div className='message-text'><strong>{msg.textomsg}</strong></div>
                </div>
            ))
        }
      
        </div>
        <div className='footer'>
        <input type="text" name="text" class="input" ref={mensagem} placeholder='Mensagem' />
        <button onClick={()=>enviarmsg()}>Enviar</button>
        </div>
        </div>
        </div>
        )
}