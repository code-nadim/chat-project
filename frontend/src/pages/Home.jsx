import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { BaseUrl } from '../../services/Api_Endpoint'
import Chat from '../components/Chat'
// import { set } from 'mongoose'

export default function Home() {
 
       const navigate = useNavigate()
  
   const {user,isAuthentication} = useSelector((state)=>state.auth)
//    console.log('userfromstate',user);
        const [socket,setSocket] = useState (null)  // State for socket connection
    
     useEffect (()=>{
        const newsocket=io(BaseUrl)
        setSocket(newsocket)

       if (user && user._id) {
         newsocket.emit("AddUserSocket",user._id)
       }

        // cleanup on component unmount
        return() => newsocket.close();
     },[])


   useEffect(() =>{
    if (isAuthentication) {
        navigate('/login')
    }
   },[isAuthentication])

  return (
   <>
   <section className='section  bg-[url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtRFNtufYx_oU-UYKJ0wJ-V15Rsc6sF0Fuxg&s")] bg-gray-200 bg-center opacity-100 ' >
   <div className="flex md:flex-row flex-col">
    <div className='basis-[25%] h-[100vh] md:bg-[#ffffff] bg-[#ffffff] overflow-y-auto  '>
        <Sidebar socket={socket} />
    </div>
    <div className='basis-[75%] h-[100vh] overflow-y-auto   '>
        <Chat socket={socket} />
    </div>
   </div>
   </section>

   </>
  )
}
