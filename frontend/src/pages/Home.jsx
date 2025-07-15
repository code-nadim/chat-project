import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Home() {
 
       const navigate = useNavigate()
  
   const {user,isAuthentication} = useSelector((state)=>state.auth)
//    console.log('userfromstate',user);
   


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
        <Sidebar></Sidebar>
    </div>
    <div className='basis-[75%] h-[100vh] overflow-y-auto   '>
        <Chat></Chat>
    </div>
   </div>
   </section>

   </>
  )
}
