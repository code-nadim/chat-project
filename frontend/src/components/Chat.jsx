import React, { useEffect, useState } from 'react'
import { IoIosSend, IoIosVideocam } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdKeyboardVoice } from 'react-icons/md';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BaseUrl } from '../../services/Api_Endpoint';






export default function Chat() {
  const {selecteUser} = useSelector((state)=>state.selectedUser)
  // console.log('selected' ,selecteUser);

  const [msgText,setMsgText] = useState('')

  const [rmessages,setRmessages] = useState ([])
  // console.log('message', rmessages);
  

   const {user} = useSelector((state)=>state.auth)

   const GetMsgg = async ()=> {
     try {
       const messageData = {
          senderId:user._id,
          reciverId:selecteUser._id,
        
        }
          const response = await axios.post(`${BaseUrl}/api/messages/get-message`,messageData)
        const data = response.data
        setRmessages(data.data)
        // console.log('data', data);
        
     } catch (error) {
      console.log('error',error);
      
     }
   }

     useEffect(()=>{
      GetMsgg()
     },[])


  const handlemessageSend = async() =>{
    try {
        const messageData = {
          senderId:user._id,
          reciverId:selecteUser._id,
          message : msgText.trim()
        }
         
        const sendMsg = await axios.post(`${BaseUrl}/api/messages/create-message`,messageData)
        const data = sendMsg.data
        // console.log('data', data);
        setMsgText("")
        
    } catch (error) {
      console.log('error', error);
      
    }
  }

  

   const profile= "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.958364154.1750917571&semt=ais_hybrid&w=740"

  return (
    <>
      <div className="min-h-screen flex-col">
        {/* Header Start */}
        <div className="w-full max-w-[1030px] fixed top-0 z-10 flex justify-between items-center py-2 px-4 bg-[#F0F2F5] shadow-md ">
           <div className="flex gap-[10px] items-center">
             <img src={selecteUser&&selecteUser.profile}
            className='ml-[13px] rounded-[45%] w-[50px] h-[50px] object-cover ' alt="" />
            <div>
                <h3 className='text-[20px]'>{selecteUser?.name}</h3>
            </div>  
           </div>
           <div className="flex gap-[15px] flex-shrink-0 ">
            <button className='text-[20px] cursor-pointer'>
                <IoIosVideocam />
            </button>
            <button className='text-[20px] cursor-pointer '>
                <CiSearch />
            </button>
            <button className='text-[20px] cursor-pointer '>
                <BsThreeDotsVertical />
            </button>
           </div>
        </div>
        {/* Header End  */}

        {/* message start */}
          
          <div className="flex-1 relative mt-[70px]">
           {rmessages && Array.isArray (rmessages) && rmessages .map((item,index)=>{
            return(
                   <div key={index}>
                <div className={`${item.userId === user._id ? 'flex justify-end': 'flex justify-start'}`}>
                    <div className={`${item.userId === user._id? ' bg-blue-600 text-black rounded-xl px-4 py-2 max-w-xs text-sm' :' bg-[#008c4c]  text-black rounded-xl px-4 py-2 max-w-xs text-sm' }`}>
                       {item.message} 
                     
                    </div>
                </div>
            </div>
            )
           })}
           
          </div>

        {/* message end  */}

        {/* bottom input start */}
         <div className="flex items-center px-4 py-2 fixed bottom-0 bg-gray-100 rounded-[10px] w-[1000px] ">
            <div className="relative flex-1">
                <input type="text" placeholder='Type your message'
                value={msgText}
                onChange={(e)=>setMsgText(e.target.value)}
                className='w-full px-3 bg-[#EEEEEF8] text-gray-800 rounded-md pr-[120px] ' />

              <button className='absolute right-16 top-1/2 transform -translate-y-1/2 text-[20px] px-3 py-1 text-black rounded-md cursor-pointer ' 
                title='Voice Message'   >
                  <MdKeyboardVoice />
                </button>

                     <button className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[25px] px-4 py-1 text-black cursor-pointer ' onClick={handlemessageSend}
                      title='Swnd Message'
                    
                     >
                      <IoIosSend />
                     </button>

            </div>
         </div>
        {/* bottom input end  */}
      </div>
    </>
  ) 
}
