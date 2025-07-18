import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/Slice/AuthSlice'
import axios from 'axios'
import { BaseUrl } from '../../services/Api_Endpoint'
import { removeSelectedUser, setSelectedUser } from '../redux/Slice/Selecteduser'

export default function Sidebar({socket}) {
        
    const dispatch =useDispatch()
    const navigate = useNavigate()
    const [users,setUsers ] = useState([])
    const [online,setOnline] = useState([])

    const {user} = useSelector((state)=>state.auth)
    

    // console.log('userfomside', user);
    

    const [isdropdown,setIsdropdown] = useState(false)

    const profile= "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.958364154.1750917571&semt=ais_hybrid&w=740"

    const handlelogout = async ()=> {
       await dispatch(logout())
       await dispatch(removeSelectedUser())
       if (socket) {
        socket.disconnect()
       }
       navigate('/login')
    }

    const GetUsers = async () => {
        try {
            const res = await axios.get(`${BaseUrl}/api/auth/getUser`)
            const data = res.data 
            // console.log('user', data);
            setUsers(data.users)
            
        } catch (error) {
console.log(error);

        }
    }

    useEffect (()=>{
        GetUsers()
    },[])
    
    useEffect(()=>{
        if (socket) {
            socket.on("getUser",(users)=>{
                setOnline(users)
            })
        }
        return()=>{
            if (socket) {
                socket.off("getuser")
            }
        }
    },[socket])

    const handleselect=(user) => {
// console.log('user',user);
  dispatch(setSelectedUser(user))

    }

     const fillterUser = users && users.filter((curUser)=> curUser._id !== user._id)

     const isUserOnline = (userId)=>{
        return online.some((online)=>online.userId === userId)
     }


  return (
   <>
   <div className="sidebar fixed top-0 left-0 max-h-screen bg-[#FFFFFF] z-10 shadow-lg md:static w-70 overflow-y-scroll h-screen py-6 px-4  ">
    {/* search and login user profile */}
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between md:mt-0 mt11">
        <input type="text" placeholder='Search' name='' id=''
        className='w-full md:w-2/3 px-4 py2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' />
       <div className="relative font-[sens-serif] mt-4 md:mt-0 md:ml-4 ">
           <button className='flex items-center rounded-full text-[#333] text-sm outline-none ' onClick={()=>setIsdropdown((prev)=> !prev)} >
            <img src={user && user.profile} className='w-9 h-9 rounded-full cursor-pointer' alt="" />
           </button>
           <ul className={`absolute right-0 mt-2 shadow-lg bg-white py-2 z-[1000] min-w-24 w-15 rounded-lg max-h-60 overflow-x-hidden ${isdropdown? 'block' : 'hidden'} `}>
            <li className="py-2.5 px-5 gap-[8px] flex item-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer ">
                Home
            </li>
            <li className="py-2.5 px-5 gap-[8px] flex item-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer " onClick={handlelogout}  >
                Logout
            </li>
           </ul>
       </div>

    </div>

    {/* search and login user profile end */}

   <div className="my-8 flex-1">
    <h6 className="text-sm text-gray-700 font-semibold mb-6"> Users </h6>
    <ul className="space-y-6">
       {fillterUser && fillterUser.map((user,index)=>{
        return(
             <li  key={index} className="flex items-center text-sm text-black hover:text-blue-500 cursor-pointer" onClick={()=>handleselect(user)} >
            <span className="relative inline-block mr-4">
                <img src={ user.profile}
                className='ml-[13px] rounded-full w-[50px] h-[50px] object-cover  '
                alt="" />
                {isUserOnline(user._id) &&
                <span className="h-2.5 w-2.5 rounded-full bg-green-600 block absolute bottom-1 right-0  "></span>
                }
            </span>
            <span className="font-medium">{user.name}</span>
        </li>
        )
       })}
       
    </ul>


   </div>
   </div>

   </>
  )
}
