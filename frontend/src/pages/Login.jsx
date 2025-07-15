import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../services/Api_Endpoint';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/Slice/AuthSlice';


export default function Login() {

  const dispatch = useDispatch()
  
  const navigate = useNavigate()
      
   const [user,setUser] = useState({
    email:"",
    password:""
   })

    const handlechange = (e) =>{
      const { name ,value} = e.target;  
      setUser({  ...user,[name]:value})
    } 

    const handleSubmit= async (e)=>{
       e.preventDefault();
    
        try {
          const response = await axios.post(`${BaseUrl}/api/auth/login`,user,{
                       
          })
          const data = response.data
          console.log('data',data);
           if (data.success) { 
        toast.success(data.message)
        setUser({ 
        email:"",
        password:""
        });

       dispatch(setCredentials({ user:data.user }));
            navigate('/')
          // localStorage.setItem("user", JSON.stringify(data.user));
          //  console.log('log',data.user);
  
       }
          
        } catch (error) {
          if (error && error.response && error.response.data) {
        toast.error(error.response.data.message)
      }
          console.log('error',error);
          
        }
       
    }

  return (
   <>
      
      <div className="bg-gray-100 font-[sans-serif] ">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 ">
          <div className='max-w-md w-full'>
            <div className="p-8 rounded-2xl bg-white shadow ">
                  <h2 className="text-gray-800 text-center text-2xl font-bold "> Login </h2>
                  <form  className="mt-8 space-y-4" onSubmit={handleSubmit}  >
                    <div>
                      <label className="text-gray-800 text-lg mb-2 block">Email</label>
                    <div>
                    <input type="email"
                     placeholder='Enter Your Email' 
                     name='email'
                     value={user.email}
                     onChange={handlechange}
                     className='w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600' />
                     </div>
                     </div>
                    <div>
                      <label className="text-gray-800 text-lg mb-2 block">Password</label>
                    <div>
                    <input type="password"
                     placeholder='Enter Your Password' 
                     name='password'
                     value={user.password}
                     onChange={handlechange}
                     className='w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600' />
                     </div>
                     </div>
                     <div className="!ml">
                      <button type='submit' className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ">
                        Login
                      </button>
                     </div>
                     <p className="text-gray-800 text-sm !ml text-center ">Don't have account? <Link to='/register' className='text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold'>Register here</Link> </p>
                  </form>
            </div>
          </div>
        </div>
      </div>

   </>
  )
}
